package br.unipar.MedialApi.service;

import br.unipar.MedialApi.exception.EmpresaIndefinidaException;
import br.unipar.MedialApi.model.EsquadriaObra;
import br.unipar.MedialApi.model.Obra;
import br.unipar.MedialApi.repository.EsquadriaObraRepository;
import br.unipar.MedialApi.repository.ObraRepository;
import br.unipar.MedialApi.specification.ObraSpecification;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.*;

@Service
public class ObraService {
    @Autowired
    private ObraRepository obraRepository;
    @Autowired
    private PerfilObraService perfilObraService;
    @Autowired
    private EsquadriaObraRepository esquadriaObraRepository;

    public Obra insert(Obra obra) throws Exception{
        validaInsert(obra);
        obra.setNrVersao(1);
        obra.setStAtivo(true);
        return obraRepository.saveAndFlush(obra);
    }

    public List<Obra> findAll(Long idEmpresa, String dsObra, Date dtLctoIni, Date dtLctoFim, Long limit, boolean retornarObrasJaImpressas) throws Exception{
        if(idEmpresa == null || idEmpresa == 0){
            throw new EmpresaIndefinidaException();
        }

        Specification<Obra> spec = Specification.where(null);
        spec = spec.and(ObraSpecification.pertenceAEmpresa(idEmpresa));

        if(dsObra != null){
            spec = spec.and(ObraSpecification.descricaoContains(dsObra));
        }
        if (dtLctoIni != null) {
            spec = spec.and(ObraSpecification.lancamentoMaiorQue(dtLctoIni));
        }
        if (dtLctoFim != null) {
            spec = spec.and(ObraSpecification.lancamentoMenorQue(dtLctoFim));
        }

        if(!retornarObrasJaImpressas){
            //quando o parametro vem false significa que a requisicao quer apenas obras que nao foram impressas ainda
            spec = spec.and(ObraSpecification.impressa());
        }

        spec = spec.and(ObraSpecification.ativo());


        Pageable pageable;
        if (limit != null && limit > 0) {
            pageable = PageRequest.of(0, limit.intValue(), Sort.by(Sort.Order.desc("dtLancamento")));
        } else {
            pageable = PageRequest.of(0, Integer.MAX_VALUE, Sort.by(Sort.Order.desc("dtLancamento")));
        }

        Page<Obra> page = obraRepository.findAll(spec, pageable);
        List<Obra> obras = page.getContent();
        return obras;

    }

    public Obra delete(Long id) throws Exception{
        Obra obra = findById(id);

        obra.setStAtivo(false);

        obraRepository.saveAndFlush(obra);
        return obra;
    }

    public Obra update(Long id, Obra obj) throws Exception{
        Obra obra = findById(id);

        obra.setDsObra(obj.getDsObra());

        validaUpdate(obra);

        return obraRepository.saveAndFlush(obra);
    }

    public Obra updateVersao(Obra obra) throws Exception{
        validaUpdate(obra);
        Obra obraAtu = findById(obra.getIdObra());
        obraAtu.setNrVersao(obra.getNrVersao());

        return obraRepository.saveAndFlush(obraAtu);
    }

    public Obra findById(Long id) throws Exception{
        Optional<Obra> retorno = obraRepository.findById(id);
        if(retorno.isPresent()){
            return retorno.get();
        }else {
            throw new Exception("Obra com o ID ("+id+") não encontrada");
        }
    }

    private void validaInsert(Obra obra) throws Exception{
        validaDescricao(obra);
        validaDataLancamento(obra);
        validaFks(obra);
    }

    private void validaUpdate(Obra obra) throws Exception{
        validaDescricao(obra);
        if(obra.getIdObra() == null || obra.getIdObra() == 0){
            throw new Exception("Informe o ID para atualizar as informações da obra");
        }
    }

    private void validaDescricao(Obra obra) throws Exception{
        obra.setDsObra(obra.getDsObra().trim().replaceAll("\\s+", " "));
        if(obra.getDsObra().trim().length() < 3){
            throw new Exception("A descrição da obra deve conter ao menos 3 caracteres.");
        }else if(obra.getDsObra().trim().length() >60){
            throw new Exception("A descrição da obra deve conter no máximo 60 caracteres.");
        }
    }

    private void validaDataLancamento(Obra obra) throws Exception{
        if(obra.getDtLancamento().compareTo(new Date()) > 0){
            throw new Exception("A data de lançamento da obra não pode ser superior a data atual.");
        }
    }
    private void validaFks(Obra obra) throws Exception{
        if(obra.getEmpresa() == null || obra.getEmpresa().getIdEmpresa() == 0){
            throw new EmpresaIndefinidaException ();
        }
    }

    public void recalcularDescontosObra(Long id) throws Exception{
        Obra obra = findById(id);

        List<EsquadriaObra> listaEsquadriasObra = esquadriaObraRepository.findAllByObraAndStAtivoIsTrue(obra);

        for (EsquadriaObra esquadriaObra : listaEsquadriasObra) {
            perfilObraService.addOperationQueue(esquadriaObra);
        }
    }

    public InputStream gerarRelatorio(Long id) throws Exception{

        if(esquadriaObraRepository.countEsquadriaObraInObra(id) <= 0){
            throw new Exception("Esta obra não contêm perfis para corte. Efetue o recalculo da obra ou verifique a parametrização de suas esquadrias.");
        }

        //compilando o subreport do cabecalho
        ClassPathResource subReportResourceCabecalhoPagina = new ClassPathResource("relatorios/cortes/rel_cortes_subreport_cabecalho_pagina.jrxml");
        InputStream subReportStreamCabecalhoPagina = subReportResourceCabecalhoPagina.getInputStream();
        JasperReport subReportCabecalhoPagina = JasperCompileManager.compileReport(subReportStreamCabecalhoPagina);

        //compilando o subreport do cabecalho do details
        ClassPathResource subreportResourceCabecalhoDetail = new ClassPathResource("relatorios/cortes/rel_cortes_subreport_cabecalho_detail.jrxml");
        InputStream subreportStreamCabecalhoDetail = subreportResourceCabecalhoDetail.getInputStream();
        JasperReport subreportCabecalhoDetail = JasperCompileManager.compileReport(subreportStreamCabecalhoDetail);

        //compilando o subreport principal
        ClassPathResource resource = new ClassPathResource("relatorios/cortes/rel_cortes.jrxml");
        InputStream inputStream = resource.getInputStream();
        JasperReport jasperReport = JasperCompileManager.compileReport(inputStream);

        Map<String, Object> parametros = new HashMap<>();
        parametros.put("P_ID_OBRA", id );
        parametros.put("P_SUBREPORT_CABECALHOPAGINA", subReportCabecalhoPagina );
        parametros.put("P_SUBREPORT_CABECALHO", subreportCabecalhoDetail );
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parametros, getConexao());

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        JRPdfExporter exporter = new JRPdfExporter();
        exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(byteArrayOutputStream));

        exporter.exportReport();

        //se deu tudo certo atualiza o status da impressao da obra para true;
        Obra obra = findById(id);
        obra.setStImpresso(true);
        obraRepository.saveAndFlush(obra);

        return new ByteArrayInputStream(byteArrayOutputStream.toByteArray());
    }


    @Value("${spring.datasource.url}")
    private String urlBd;
    @Value("${spring.datasource.username}")
    private String usernameBd;
    @Value("${spring.datasource.password}")
    private String passwordBd;
    private Connection conn = null;
    public Connection getConexao() {
        try {
            if(conn == null || conn.isClosed()){
                conn = DriverManager.getConnection(urlBd, usernameBd, passwordBd);
            }
            return conn;
        }catch (Exception e) {
            conn = null;
        }
        return null;
    }
}
