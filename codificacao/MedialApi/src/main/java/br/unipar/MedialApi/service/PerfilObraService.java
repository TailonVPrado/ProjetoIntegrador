package br.unipar.MedialApi.service;

import br.unipar.MedialApi.exception.ParametroNaoInformadoException;
import br.unipar.MedialApi.exception.SemFormulaException;
import br.unipar.MedialApi.model.EsquadriaObra;
import br.unipar.MedialApi.model.PerfilEsquadria;
import br.unipar.MedialApi.model.PerfilObra;
import br.unipar.MedialApi.model.dto.PerfilObraAgrupado;
import br.unipar.MedialApi.model.enumModel.OperacaoEnum;
import br.unipar.MedialApi.model.modelQueue.EsquadriaObraQueue;
import br.unipar.MedialApi.repository.PerfilEsquadriaRepository;
import br.unipar.MedialApi.repository.PerfilObraRepository;
import br.unipar.MedialApi.util.EmailService;
import br.unipar.MedialApi.util.NumericExpressionEngine;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
@Slf4j
@Service
public class PerfilObraService {
    private final Map<Long, LinkedBlockingQueue<EsquadriaObraQueue>> filasPorEmpresa = new ConcurrentHashMap<>();
    private final Map<Long, Executor> executoresPorEmpresa = new ConcurrentHashMap<>();

    @Autowired
    private PerfilObraRepository perfilObraRepository;
    @Autowired
    private PerfilEsquadriaRepository perfilEsquadriaRepository;
    @Autowired
    private EmailService emailService;

    @Async
    public void addOperationQueue(EsquadriaObra esquadriaObra){
        /*em casos de update precisa deletar e inserir o novo, e por isso nao passa argumentos para esse emtodo e ele passa o DELETE e INSERT para o metodo principal*/
        addOperationQueue(esquadriaObra, OperacaoEnum.DELETE);
        addOperationQueue(esquadriaObra, OperacaoEnum.INSERT);
    }

    @Async
    public void addOperationQueue(EsquadriaObra esquadriaObra, OperacaoEnum operacao){
        EsquadriaObraQueue esquadriaObraQueue = new EsquadriaObraQueue();
        esquadriaObraQueue.setEsquadriaObra(esquadriaObra);
        esquadriaObraQueue.setOperacao(operacao);

        if(esquadriaObra.getObra().getEmpresa().getIdEmpresa() == null || esquadriaObra.getObra().getEmpresa().getIdEmpresa() == 0){
            log.warn("Codigo da empresa nao encontrada para a esquadria {}, obra {}, codigo da esquadriaObra",
                    esquadriaObra.getEsquadria().getIdEsquadria(),
                    esquadriaObra.getObra().getIdObra(),
                    esquadriaObra.getIdEsquadriaObra());
//            throw new Exception("A empresa da esquadria nao foi encontrada para realizar o cálculo dos descontos. Entre em contato com os administradores do sistema");
        }

        Long idEmpresa = esquadriaObra.getObra().getEmpresa().getIdEmpresa();

        filasPorEmpresa.computeIfAbsent(idEmpresa, key -> new LinkedBlockingQueue<>()).add(esquadriaObraQueue);
        // Inicie o executor para a empresa, se ainda não estiver em execução
        executoresPorEmpresa.computeIfAbsent(idEmpresa, key -> Executors.newSingleThreadExecutor()).execute(() -> processQueue(idEmpresa));
    }

    private void processQueue(Long idEmpresa) {
        LinkedBlockingQueue<EsquadriaObraQueue> fila = filasPorEmpresa.get(idEmpresa);

        //executa enquanto a fila possuir algum registro para a empresa
        while (!fila.isEmpty()) {
            try {
                EsquadriaObraQueue operacao = fila.take();
                // Execute a operação com base no tipo (insert or update)
                if (operacao.getOperacao() == OperacaoEnum.INSERT) {
                    calculaPerfilObra(operacao.getEsquadriaObra());
                } else if (operacao.getOperacao() == OperacaoEnum.DELETE) {
                    deletePerfilObra(operacao.getEsquadriaObra());
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

    private void calculaPerfilObra(EsquadriaObra esquadriaObra) {
        List<PerfilEsquadria> listaPerfisEsquadria = perfilEsquadriaRepository.findAllByEsquadriaAndStAtivoIsTrue(esquadriaObra.getEsquadria());

        for (PerfilEsquadria perfilEsquadria: listaPerfisEsquadria) {
            try{
                PerfilObra perfilObra = new PerfilObra();
                perfilObra.setStAtivo(true);
                perfilObra.setEsquadriaobra(esquadriaObra);
                perfilObra.setPerfilesquadria(perfilEsquadria);
                perfilObra.setTmPerfil(retornaTmPerfilObra(esquadriaObra, perfilEsquadria));

                perfilObraRepository.saveAndFlush(perfilObra);
            }catch (Exception e){
                log.error(e.getMessage());
            }
        }
    }

    private void deletePerfilObra(EsquadriaObra esquadriaObra) {
        perfilObraRepository.deleteAll(findByEsquadriaObra(esquadriaObra));
    }

    private double retornaTmPerfilObra(EsquadriaObra esquadriaObra, PerfilEsquadria perfilEsquadria) throws Exception{
        try {
            String formula = perfilEsquadria.getDsDesconto().toUpperCase();
            BigDecimal largura = esquadriaObra.getTmLargura();
            BigDecimal altura = esquadriaObra.getTmAltura();


            if(formula.trim() != null && !formula.isEmpty()){
                formula = formula.replaceAll("LT", String.valueOf(largura));
                formula = formula.replaceAll("AT", String.valueOf(altura));
//                NumericExpressionEngine.validaCaracteresFormula(formula);
                return NumericExpressionEngine.resolve(formula).doubleValue();
            }else{
                throw new SemFormulaException("Formula não informada para o perfil ("+perfilEsquadria.getPerfil().getIdPerfil()+"), " +
                        "Esquadria ("+perfilEsquadria.getEsquadria().getIdEsquadria()+"), " +
                        "perfilEsquadria ("+perfilEsquadria.getIdPerfilEsquadria()+")");
            }
        }catch (SemFormulaException ex){
            throw new Exception(ex.getMessage());
        }catch (Exception ex) {
            String msg = "ERRO AO EXECUTAR FORMULA!!!\n" +
                    "EMPRESA: (" + esquadriaObra.getObra().getEmpresa().getNmEmpresa() + ")("+esquadriaObra.getObra().getEmpresa().getIdEmpresa()+").\n" +
                    "OBRA: (" +esquadriaObra.getObra().getDsObra() +")("+esquadriaObra.getObra().getIdObra()+")\n" +
                    "ESQUADRIA: (" +esquadriaObra.getEsquadria().getDsEsquadria()+")("+esquadriaObra.getEsquadria().getIdEsquadria()+")\n" +
                    "PERFIL: (" +perfilEsquadria.getPerfil().getDsPerfil()+")("+perfilEsquadria.getPerfil().getIdPerfil()+")\n"+
                    "ID_ESQUADRIAOBRA: " +esquadriaObra.getIdEsquadriaObra()+"\n"+
                    "ID_PERFILESQUADRIA: " +perfilEsquadria.getIdPerfilEsquadria()+"\n"+
                    "ALTURA DA ESQUADRIA: " +esquadriaObra.getTmAltura()+"\n"+
                    "LARGURA DA ESQUADRIA: " +esquadriaObra.getTmLargura()+"\n"+
                    "DESCONTO DO PERFIL: " +perfilEsquadria.getDsDesconto()+"\n"+
                    "ERRO: " + ex.getMessage()+"\n\n\n\n";

            emailService.addEmailQueue("ERRO GRAVE AO EXECUTAR FORMULA", msg);//envia email aos adm avisando a falha
            throw new Exception(msg);
        }
    }

    private List<PerfilObra> findByEsquadriaObra(EsquadriaObra esquadriaObra){
        return perfilObraRepository.findAllByEsquadriaobra(esquadriaObra);
    }

    public List<PerfilObraAgrupado> findPerfilObraAgrupado(Long idEsquadria,
                                                           Long idObra,
                                                           String dsCor,
                                                           BigDecimal tmLargura,
                                                           BigDecimal tmAltura) throws Exception{
        try{
            if(idEsquadria == null || idEsquadria == 0){
                throw new ParametroNaoInformadoException("ESQUADRIA");
            }
            if(idObra == null || idObra == 0){
                throw new ParametroNaoInformadoException("OBRA");
            }
            if(tmLargura == null || tmLargura == BigDecimal.ZERO){
                throw new ParametroNaoInformadoException("LARGURA");
            }
            if(tmAltura == null || tmAltura == BigDecimal.ZERO){
                throw new ParametroNaoInformadoException("ALTURA");
            }
            if(dsCor == null || dsCor.isEmpty()){
                throw new ParametroNaoInformadoException("COR");
            }

            List<Object[]> objs = perfilObraRepository.findPerfilObraAgrupado(idEsquadria, idObra, dsCor, tmLargura, tmAltura);

            List<PerfilObraAgrupado> listaDto = new ArrayList<>();
            for (Object[] obj: objs) {
                PerfilObraAgrupado dto = new PerfilObraAgrupado();

                dto.setDsPerfil((String) obj[0]);
                dto.setTmPerfil((BigDecimal) obj[1]);
                dto.setQtPerfil(((BigDecimal) obj[2]).longValue());
                dto.setCdEsquadriaObra((String) obj[3]);

                listaDto.add(dto);
            }
            return listaDto;
        }catch (ParametroNaoInformadoException e){
            throw new Exception("Erro ao realizar a consulta dos perfis. Erro: "+e.getMessage()+" não informada.");
        }catch (Exception e){
            throw new Exception("Ocorreu um erro inesperado ao realizar a consulta dos perfis. Erro: "+e.getMessage());
        }
    }
}
