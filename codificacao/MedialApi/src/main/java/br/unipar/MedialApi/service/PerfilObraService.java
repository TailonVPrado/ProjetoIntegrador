package br.unipar.MedialApi.service;

import br.unipar.MedialApi.exception.ExceptionSemFormula;
import br.unipar.MedialApi.model.EsquadriaObra;
import br.unipar.MedialApi.model.PerfilEsquadria;
import br.unipar.MedialApi.model.PerfilObra;
import br.unipar.MedialApi.model.enumModel.Operacao;
import br.unipar.MedialApi.model.modelQueue.EsquadriaObraQueue;
import br.unipar.MedialApi.repository.PerfilEsquadriaRepository;
import br.unipar.MedialApi.repository.PerfilObraRepository;
import br.unipar.MedialApi.util.NumericExpressionEngine;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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

    @Async
    public void addOperationQueue(EsquadriaObra esquadriaObra){
        /*em casos de update precisa deletar e inserir o novo, e por isso nao passa argumentos para esse emtodo e ele passa o DELETE e INSERT para o metodo principal*/
        addOperationQueue(esquadriaObra, Operacao.DELETE);
        addOperationQueue(esquadriaObra, Operacao.INSERT);
    }

    @Async
    public void addOperationQueue(EsquadriaObra esquadriaObra, Operacao operacao){
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
                if (operacao.getOperacao() == Operacao.INSERT) {
                    calculaPerfilObra(operacao.getEsquadriaObra());
                } else if (operacao.getOperacao() == Operacao.DELETE) {
                    deletePerfilObra(operacao.getEsquadriaObra());
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

    private void calculaPerfilObra(EsquadriaObra esquadriaObra) {
        List<PerfilEsquadria> listaPerfisEsquadria = perfilEsquadriaRepository.findAllByEsquadria(esquadriaObra.getEsquadria());

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

                return NumericExpressionEngine.resolve(formula).doubleValue();
            }else{
                throw new ExceptionSemFormula("Formula nao informada para o perfil ("+perfilEsquadria.getPerfil().getIdPerfil()+"), " +
                        "Esquadria ("+perfilEsquadria.getEsquadria().getIdEsquadria()+"), " +
                        "perfilEsquadria ("+perfilEsquadria.getIdPerfilEsquadria()+")");
            }
        }catch (ExceptionSemFormula ex){
            throw new Exception(ex.getMessage());
        }catch (Exception ex) {
            throw new Exception("ERRO AO EXECUTAR FORMULA. ERRO; "+ex.getMessage());
        }
    }

    private List<PerfilObra> findByEsquadriaObra(EsquadriaObra esquadriaObra){
        return perfilObraRepository.findAllByEsquadriaobra(esquadriaObra);
    }

}
