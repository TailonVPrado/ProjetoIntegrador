package br.unipar.MedialApi.service;

import br.unipar.MedialApi.model.Esquadria;
import br.unipar.MedialApi.model.PerfilEsquadria;
import br.unipar.MedialApi.model.dto.PerfilDto;
import br.unipar.MedialApi.model.dto.PerfilEsquadriaDto;
import br.unipar.MedialApi.repository.EsquadriaObraRepository;
import br.unipar.MedialApi.repository.PerfilEsquadriaRepository;
import br.unipar.MedialApi.specification.PerfilEsquadriaSpecification;
import br.unipar.MedialApi.util.NumericExpressionEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class PerfilEsquadriaService {

    @Autowired
    private PerfilEsquadriaRepository perfilEsquadriaRepository;
    @Autowired
    private EsquadriaObraService esquadriaObraService;
    @Autowired
    private PerfilObraService perfilObraService;

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

    public PerfilEsquadria update(Long id, PerfilEsquadria perfilEsquadria) throws Exception{
        PerfilEsquadria perfilEsquadriaUpdate = findById(id);
        perfilEsquadriaUpdate.setDsDesconto(perfilEsquadria.getDsDesconto());
        perfilEsquadriaUpdate.setQtPerfil(perfilEsquadria.getQtPerfil());
        perfilEsquadriaUpdate.setPerfil(perfilEsquadria.getPerfil());

        validaUpdate(perfilEsquadriaUpdate);
        recalculaDescontos(perfilEsquadriaUpdate);
        return perfilEsquadriaRepository.saveAndFlush(perfilEsquadriaUpdate);
    }

    public PerfilEsquadria findById(Long id) throws Exception{
        Optional<PerfilEsquadria> retorno = perfilEsquadriaRepository.findById(id);
        if(retorno.isPresent()){
            return retorno.get();
        }else{
            throw new Exception("Vinculo com o ID ("+id+") não encontrado");
        }
    }

    public List<PerfilEsquadria> findByEsquadriaObra(Esquadria esquadria){
        return perfilEsquadriaRepository.findAllByEsquadriaAndStAtivoIsTrue(esquadria);
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
        perfilEsquadria.setDsDesconto(perfilEsquadria.getDsDesconto().trim().replaceAll("\\s+", " "));
        if(perfilEsquadria.getDsDesconto().trim().length() > 50){
            throw new Exception("A formula informada é muito grande. Verifique!.");
        }
        perfilEsquadria.setDsDesconto(perfilEsquadria.getDsDesconto().replaceAll(",", "."));

        try {
            String formula = perfilEsquadria.getDsDesconto().toUpperCase();

//            NumericExpressionEngine.validaCaracteresFormula(formula);

            if(formula.trim() != null && !formula.isEmpty()){
                formula = formula.replaceAll("LT", String.valueOf(new BigDecimal(100.0)));
                formula = formula.replaceAll("AT", String.valueOf(new BigDecimal(100.0)));

                NumericExpressionEngine.resolve(formula);
            }
        } catch (Exception ex) {
            throw new Exception(ex.getMessage());
        }
    }


    private void recalculaDescontos(PerfilEsquadria perfilEsquadria) throws Exception{
        /* Se alterou os descontos recalcula todas as obras que ainda nao foram impressas (as que ja foram
         * impressas nao recalcula porque em teoria o arquivo ja foi gerado e ja esta em processo de corte)
         * */
        if(!perfilEsquadria.getDsDesconto().equals(findById(perfilEsquadria.getIdPerfilEsquadria()).getDsDesconto())){
            Long[] idsEsquadriaObra = esquadriaObraService.findAllEsquadriaObraContemPerfil(perfilEsquadria.getIdPerfilEsquadria());
            for(int i = 0; i < idsEsquadriaObra.length; i++){
                perfilObraService.addOperationQueue(esquadriaObraService.findById(idsEsquadriaObra[i]));
            }
        }
    }
}
