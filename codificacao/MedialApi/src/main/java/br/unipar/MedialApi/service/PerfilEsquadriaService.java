package br.unipar.MedialApi.service;

import br.unipar.MedialApi.controller.PerfilEsquadriaController;
import br.unipar.MedialApi.model.Perfil;
import br.unipar.MedialApi.model.PerfilEsquadria;
import br.unipar.MedialApi.repository.PerfilEsquadriaRepository;
import br.unipar.MedialApi.util.NumericExpressionEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.script.ScriptException;
import java.math.BigDecimal;

@Service
public class PerfilEsquadriaService {

    @Autowired
    private PerfilEsquadriaRepository perfilEsquadriaRepository;

    public PerfilEsquadria insert(PerfilEsquadria perfilEsquadria) throws Exception {
        validaInsert(perfilEsquadria);


        return perfilEsquadriaRepository.saveAndFlush(perfilEsquadria);
    }

    private void validaInsert(PerfilEsquadria perfilEsquadria) throws Exception{
        validaFks(perfilEsquadria);
        validaDefault(perfilEsquadria);
        simulaDesconto(perfilEsquadria);
    }


    private void validaFks(PerfilEsquadria perfilEsquadria)throws Exception{
        if(perfilEsquadria.getPerfil() == null || perfilEsquadria.getPerfil().getIdPerfil() == 0){
            throw new Exception("Informe o perfil para realizar o vinculo com a esquadria.");
        }
        if(perfilEsquadria.getEsquadria() == null || perfilEsquadria.getEsquadria().getIdEsquadria() == 0){
            throw new Exception("Informe a Esquadria para realizar o vinculo.");
        }

    }
    private void validaDefault(PerfilEsquadria perfilEsquadria)throws Exception{
        if(perfilEsquadria.getQtPerfil() == null || perfilEsquadria.getQtPerfil() <= 0){
            throw new Exception("A quantidade minima para vincular um perfil a uma esquadria é 1.");
        }
    }
    private void simulaDesconto(PerfilEsquadria perfilEsquadria) throws Exception{
        try {
            String formula = perfilEsquadria.getDsDesconto().toUpperCase();

            if(formula.trim() != null && !formula.equals("")){
                formula = formula.replaceAll("LT", String.valueOf(new BigDecimal(100.0)));
                formula = formula.replaceAll("AT", String.valueOf(new BigDecimal(100.0)));

                NumericExpressionEngine.resolve(formula);
            }

        } catch (ScriptException ex) {
            System.out.println("erro formula: "+ex);
            throw new Exception("Formula inválida, verifique!");
        }
    }
}
