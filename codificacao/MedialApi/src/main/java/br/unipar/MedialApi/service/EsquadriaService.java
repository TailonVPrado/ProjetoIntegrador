package br.unipar.MedialApi.service;

import br.unipar.MedialApi.exception.EmpresaIndefinidaException;
import br.unipar.MedialApi.model.Esquadria;
import br.unipar.MedialApi.model.Perfil;
import br.unipar.MedialApi.model.dto.PerfilDto;
import br.unipar.MedialApi.repository.EsquadriaRepository;
import br.unipar.MedialApi.specification.EsquadriaSpecification;
import br.unipar.MedialApi.specification.PerfilSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EsquadriaService {
    @Autowired
    private EsquadriaRepository esquadriaRepository;

    public Esquadria insert(Esquadria esquadria) throws Exception{
        validaInsert(esquadria);
        return esquadriaRepository.saveAndFlush(esquadria);
    }

    public Esquadria update(Long id, Esquadria obj) throws Exception{
        Esquadria esquadria = findById(id);

        esquadria.setDsEsquadria(obj.getDsEsquadria());
        esquadria.setLinha(obj.getLinha());

        validaUpdate(esquadria);

        return esquadriaRepository.saveAndFlush(esquadria);
    }

    public Esquadria findById(Long id) throws Exception{
        Optional<Esquadria> retorno = esquadriaRepository.findById(id);
        if(retorno.isPresent()){
            return retorno.get();
        }else {
            throw new Exception("Esquadria com o ID ("+id+") não encontrada");
        }
    }
    @Transactional
    public Esquadria delete(Long id) throws Exception{
        Esquadria esquadria = findById(id);

        esquadria.setStAtivo(false);

        esquadriaRepository.save(esquadria);
        return esquadria;
    }

    private void validaInsert(Esquadria esquadria) throws Exception{
        validaDescricao(esquadria);
        validaFks(esquadria);
    }

    public List<Esquadria> findAll(Long idEmpresa, Long idLinha, String dsEsquadria) throws Exception{
        if(idEmpresa == null || idEmpresa == 0){
            throw new EmpresaIndefinidaException();
        }

        Specification<Esquadria> spec = Specification.where(null);
        spec = spec.and(EsquadriaSpecification.pertenceAEmpresa(idEmpresa));

        if(idLinha != null && idLinha != 0){
            spec = spec.and(EsquadriaSpecification.pertenceALinha(idLinha));
        }
        if(dsEsquadria != null){
            spec = spec.and(EsquadriaSpecification.descricaoContains(dsEsquadria));
        }
        spec = spec.and(EsquadriaSpecification.ativo());

        return esquadriaRepository.findAll(spec, Sort.by("dsEsquadria").ascending());

    }

    private void validaUpdate(Esquadria esquadria) throws Exception{
        validaDescricao(esquadria);
        validaFks(esquadria);
        if(esquadria.getIdEsquadria() == null) {
            throw new Exception("Informe o ID para atualizar as informações da esquadria");
        }
    }

    private void validaDescricao(Esquadria esquadria) throws Exception{
        esquadria.setDsEsquadria(esquadria.getDsEsquadria().trim().replaceAll("\\s+", " "));
        if(esquadria.getDsEsquadria().trim().length() < 3){
            throw new Exception("A descrição da esquadria deve conter ao menos 3 caracteres");
        }else if(esquadria.getDsEsquadria().trim().length() >60){
            throw new Exception("A descrição da esquadria deve conter no máximo 60 caracteres");
        }
    }

    private void validaFks(Esquadria esquadria) throws Exception{
        if(esquadria.getEmpresa() == null || esquadria.getEmpresa().getIdEmpresa() == 0){
            throw new EmpresaIndefinidaException();
        }
        if(esquadria.getLinha() == null || esquadria.getLinha().getIdLinha() == 0){
            throw new Exception("Não é possivel inserir uma esquadria sem vinculo com uma linha. Verifique!");
        }
    }
}
