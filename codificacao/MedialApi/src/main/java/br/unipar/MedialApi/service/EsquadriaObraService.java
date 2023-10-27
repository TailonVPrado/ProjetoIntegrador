package br.unipar.MedialApi.service;

import br.unipar.MedialApi.model.EsquadriaObra;
import br.unipar.MedialApi.model.Obra;
import br.unipar.MedialApi.model.PerfilEsquadria;
import br.unipar.MedialApi.model.enumModel.CorEnum;
import br.unipar.MedialApi.repository.EsquadriaObraRepository;
import br.unipar.MedialApi.specification.EsquadriaObraSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EsquadriaObraService {
    @Autowired
    private EsquadriaObraRepository esquadriaObraRepository;

    @Autowired
    private ObraService obraService;

    public List<EsquadriaObra> findAll (Long idObra, Long idEsquadria){
        Specification<EsquadriaObra> spec = Specification.where(null);

        if(idObra != null && idObra != 0){
            spec = spec.and(EsquadriaObraSpecification.pertenceAObra(idObra));
        }
        if(idEsquadria != null && idEsquadria != 0){
            spec = spec.and(EsquadriaObraSpecification.pertenceAEsquadria(idEsquadria));
        }
        spec = spec.and(EsquadriaObraSpecification.ativo());

        List<EsquadriaObra> esquadriaObras = esquadriaObraRepository.findAll(spec, Sort.by("idEsquadriaObra").descending());

        return esquadriaObras;
    }

    public EsquadriaObra insert (EsquadriaObra esquadriaObra) throws Exception{
        validaInsert(esquadriaObra);
        Obra obra = obraService.findById(esquadriaObra.getObra().getIdObra());
        if(!obra.isStImpreso()){
            esquadriaObra.setStAtivo(true);
            esquadriaObra.setNrVersaobra(obra.getNrVersao());
            return esquadriaObraRepository.saveAndFlush(esquadriaObra);
        }else{
            return insereEsquadriaEmObraImpressa(esquadriaObra);
        }
    }

    private EsquadriaObra insereEsquadriaEmObraImpressa(EsquadriaObra esquadriaObra) throws Exception{
        Obra obra = obraService.findById(esquadriaObra.getObra().getIdObra());
        int vNrVersao = obra.getNrVersao() + 1;

        //atualiza a versao da obra
        esquadriaObra.getObra().setNrVersao(vNrVersao);
        obraService.updateVersao(esquadriaObra.getObra());

        List<EsquadriaObra> esquadrias = findAll(esquadriaObra.getObra().getIdObra(), null);

        for (EsquadriaObra eo: esquadrias) {
            //insere a copia da esquadria obra
            EsquadriaObra esquadriaatualizada = new EsquadriaObra();
            esquadriaatualizada.setCdEsquadriaObra(esquadriaObra.getCdEsquadriaObra());
            esquadriaatualizada.setDsCor(eo.getDsCor());
            esquadriaatualizada.setTmAltura(eo.getTmAltura());
            esquadriaatualizada.setTmLargura(eo.getTmLargura());
            esquadriaatualizada.setEsquadria(eo.getEsquadria());
            esquadriaatualizada.setObra(eo.getObra());
            esquadriaatualizada.setStAtivo(true);
            esquadriaatualizada.setNrVersaobra(vNrVersao);
            esquadriaObraRepository.saveAndFlush(esquadriaatualizada);

            //desabilita a esquadriaObra anterior para manter versionamento da obra
            eo.setStAtivo(false);
            esquadriaObraRepository.saveAndFlush(eo);
        }
        //insere a nova esqaudriaObra
        esquadriaObra.setStAtivo(true);
        esquadriaObra.setNrVersaobra(vNrVersao);
        return esquadriaObraRepository.saveAndFlush(esquadriaObra);
    }

    public EsquadriaObra delete (Long idEsquadriaObra) throws Exception{
        EsquadriaObra esquadriaObra = findById(idEsquadriaObra);

        Obra obra = obraService.findById(esquadriaObra.getObra().getIdObra());
        if(!obra.isStImpreso()){
            esquadriaObra.setStAtivo(false);
            return esquadriaObraRepository.saveAndFlush(esquadriaObra);
        }else{
            return atualizaEsquadriaEmObraImpressa(esquadriaObra);
        }
    }

    private EsquadriaObra atualizaEsquadriaEmObraImpressa(EsquadriaObra esquadriaObra) throws Exception {
        Obra obra = obraService.findById(esquadriaObra.getObra().getIdObra());
        int vNrVersao = obra.getNrVersao() + 1;

        //atualiza a versao da obra
        esquadriaObra.getObra().setNrVersao(vNrVersao);
        obraService.updateVersao(esquadriaObra.getObra());

        List<EsquadriaObra> esquadrias = findAll(esquadriaObra.getObra().getIdObra(), null);

        for (EsquadriaObra eo: esquadrias) {
            /* insere a copia da esquadria obra
             * -Como é um delete precisa inserir na nova versao da esquadria obra apenas os registros que o usuario NAO apagou*/
            if(eo.getIdEsquadriaObra() != esquadriaObra.getIdEsquadriaObra()){
                EsquadriaObra esquadriaatualizada = new EsquadriaObra();
                esquadriaatualizada.setCdEsquadriaObra(esquadriaObra.getCdEsquadriaObra());
                esquadriaatualizada.setDsCor(eo.getDsCor());
                esquadriaatualizada.setTmAltura(eo.getTmAltura());
                esquadriaatualizada.setTmLargura(eo.getTmLargura());
                esquadriaatualizada.setEsquadria(eo.getEsquadria());
                esquadriaatualizada.setObra(eo.getObra());
                esquadriaatualizada.setStAtivo(true);
                esquadriaatualizada.setNrVersaobra(vNrVersao);
                esquadriaObraRepository.saveAndFlush(esquadriaatualizada);
            }

            //desabilita a esquadriaObra anterior para manter versionamento da obra
            eo.setStAtivo(false);
            esquadriaObraRepository.saveAndFlush(eo);
        }
        //insere a nova esqaudriaObra
        esquadriaObra.setStAtivo(true);
        esquadriaObra.setNrVersaobra(vNrVersao);
        return esquadriaObraRepository.saveAndFlush(esquadriaObra);
    }

    public EsquadriaObra findById(Long id) throws Exception{
        Optional<EsquadriaObra> retorno = esquadriaObraRepository.findById(id);
        if(retorno.isPresent()){
            return retorno.get();
        }else{
            throw new Exception("Vinculo com o ID ("+id+") não encontrado");
        }
    }

    public EsquadriaObra update(EsquadriaObra esquadriaObra) throws Exception{
        validaUpdate(esquadriaObra);
        return esquadriaObraRepository.saveAndFlush(esquadriaObra);
    }
    public List<CorEnum> getCotes() {
        return List.of(CorEnum.values());
    }

    private void validaInsert(EsquadriaObra esquadriaObra) throws Exception{
        validaFks(esquadriaObra);
        validaDefault(esquadriaObra);
    }
    private void validaFks(EsquadriaObra esquadriaObra)throws Exception{
        if(esquadriaObra.getObra() == null || esquadriaObra.getObra().getIdObra() == 0){
            throw new Exception("Informe a Obra para realizar o vinculo.");
        }
        if(esquadriaObra.getEsquadria() == null || esquadriaObra.getEsquadria().getIdEsquadria() == 0){
            throw new Exception("Informe a esquadria para realizar o vinculo com a obra.");
        }
    }
    private void validaDefault(EsquadriaObra esquadriaObra)throws Exception{

        esquadriaObra.setCdEsquadriaObra(esquadriaObra.getCdEsquadriaObra().trim().replaceAll("\\s+", " "));
        if(esquadriaObra.getCdEsquadriaObra() == null || esquadriaObra.getEsquadria().equals("")){
            throw new Exception("Informe o código da esquadria.");
        }
        if(esquadriaObra.getCdEsquadriaObra().trim().length() > 5){
            throw new Exception("O código da esquadria deve conter no máximo 5 caracteres.");
        }
        if(esquadriaObra.getTmAltura() == null || esquadriaObra.getTmAltura().compareTo(new BigDecimal(0)) <= 0){
            throw new Exception("Altura inválida, verifique!");
        }
        if(esquadriaObra.getTmLargura() == null || esquadriaObra.getTmLargura().compareTo(new BigDecimal(0)) <= 0){
            throw new Exception("Largura inválida, verifique!");
        }
        if(esquadriaObra.getDsCor() == null || esquadriaObra.getDsCor().equals(CorEnum.VAZIO) || esquadriaObra.getDsCor().toString().isEmpty()){
            throw new Exception("Informe a cor da esquadria.");
        }
    }
    private void validaUpdate(EsquadriaObra esquadriaObra) throws Exception{
        validaFks(esquadriaObra);
        validaDefault(esquadriaObra);
        if(esquadriaObra.getIdEsquadriaObra() == null || esquadriaObra.getIdEsquadriaObra() == 0){
            throw new Exception("Informe o ID para atualizar as informações de vinculo da esquadria com esta obra");
        }
    }
}
