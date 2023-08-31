package br.unipar.MedialApi.service;

import br.unipar.MedialApi.controller.PerfilEsquadriaController;
import br.unipar.MedialApi.model.Perfil;
import br.unipar.MedialApi.model.PerfilEsquadria;
import br.unipar.MedialApi.model.dto.PerfilDto;
import br.unipar.MedialApi.model.dto.PerfilEsquadriaDto;
import br.unipar.MedialApi.repository.PerfilEsquadriaRepository;
import br.unipar.MedialApi.specification.PerfilEsquadriaSpecification;
import br.unipar.MedialApi.specification.PerfilSpecification;
import br.unipar.MedialApi.util.NumericExpressionEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import javax.script.ScriptException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PerfilEsquadriaService {

    @Autowired
    private PerfilEsquadriaRepository perfilEsquadriaRepository;

    public PerfilEsquadria insert(PerfilEsquadria perfilEsquadria) throws Exception {
        validaInsert(perfilEsquadria);

        perfilEsquadria.setStAtivo(true);
        return perfilEsquadriaRepository.saveAndFlush(perfilEsquadria);
    }

    public List<PerfilEsquadriaDto> findAll (Long idEsquadria, Long idPerfil){
        Specification<PerfilEsquadria> spec = Specification.where(null);

        if(idEsquadria != null && idEsquadria != 0){
            spec = spec.and(PerfilEsquadriaSpecification.pertenceAEsquadria(idEsquadria));
        }
        if(idPerfil != null && idPerfil != 0){
            spec = spec.and(PerfilEsquadriaSpecification.pertenceAOPerfil(idPerfil));
        }
        spec = spec.and(PerfilEsquadriaSpecification.ativo());

        List<PerfilEsquadria> perfilEsquadrias = perfilEsquadriaRepository.findAll(spec, Sort.by("perfil.dsPerfil").ascending());

        List<PerfilEsquadriaDto> perfilEsquadriaDtoList = new ArrayList<>();
        for (PerfilEsquadria perfilEsquadria: perfilEsquadrias) {
            PerfilEsquadriaDto perfilEsquadriaDto = new PerfilEsquadriaDto();
            PerfilDto perfilDto = new PerfilDto();

            perfilEsquadriaDto.setIdPerfilEsquadria(perfilEsquadria.getIdPerfilEsquadria());
            perfilEsquadriaDto.setQtPerfil(perfilEsquadria.getQtPerfil());
            perfilEsquadriaDto.setDsDesconto(perfilEsquadria.getDsDesconto());
            perfilEsquadriaDto.setEsquadria(perfilEsquadria.getEsquadria());

            perfilDto.setIdPerfil(perfilEsquadria.getPerfil().getIdPerfil());
            perfilDto.setDsPerfil(perfilEsquadria.getPerfil().getDsPerfil());
            perfilDto.setEmpresa(perfilEsquadria.getPerfil().getEmpresa());
            perfilDto.setLinha(perfilEsquadria.getPerfil().getLinha());

            perfilEsquadriaDto.setPerfil(perfilDto);

            perfilEsquadriaDtoList.add(perfilEsquadriaDto);
        }

        return perfilEsquadriaDtoList;
    }

    public PerfilEsquadria delete (Long idPerfilEsquadria) throws Exception{
        PerfilEsquadria perfilEsquadria = findById(idPerfilEsquadria);

        perfilEsquadria.setStAtivo(false);

        perfilEsquadriaRepository.save(perfilEsquadria);
        return perfilEsquadria;
    }

    public PerfilEsquadria update(PerfilEsquadria perfilEsquadria) throws Exception{
        validaUpdate(perfilEsquadria);
        return perfilEsquadriaRepository.saveAndFlush(perfilEsquadria);
    }
    public PerfilEsquadria findById(Long id) throws Exception{
        Optional<PerfilEsquadria> retorno = perfilEsquadriaRepository.findById(id);
        if(retorno.isPresent()){
            return retorno.get();
        }else{
            throw new Exception("Vinculo com o ID ("+id+") não encontrado");
        }
    }

    private void validaInsert(PerfilEsquadria perfilEsquadria) throws Exception{
        validaFks(perfilEsquadria);
        validaDefault(perfilEsquadria);
        simulaDesconto(perfilEsquadria);
    }
    private void validaUpdate(PerfilEsquadria perfilEsquadria) throws Exception{
        validaFks(perfilEsquadria);
        validaDefault(perfilEsquadria);
        simulaDesconto(perfilEsquadria);
        if(perfilEsquadria.getIdPerfilEsquadria() == null || perfilEsquadria.getIdPerfilEsquadria() == 0){
            throw new Exception("Informe o ID para atualizar as informações de vinculo do perfil com esta esquadria");
        }
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
