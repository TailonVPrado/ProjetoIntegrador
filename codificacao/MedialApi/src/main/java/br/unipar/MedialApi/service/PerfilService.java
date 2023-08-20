package br.unipar.MedialApi.service;

import br.unipar.MedialApi.model.Perfil;
import br.unipar.MedialApi.repository.PerfilRepository;
import br.unipar.MedialApi.specification.PerfilSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PerfilService {

    @Autowired
    private PerfilRepository perfilRepository;

    public Perfil insert(Perfil perfil) throws Exception{
        validaInsert(perfil);
        return perfilRepository.saveAndFlush(perfil);
    }

    public List<Perfil> findAll(Long idEmpresa, Long idLinha, String dsPerfil){
        Specification<Perfil> spec = Specification.where(null);

        if(idEmpresa != null && idEmpresa != 0){
            spec = spec.and(PerfilSpecification.pertenceAEmpresa(idEmpresa));
        }
        if(idLinha != null && idLinha != 0){
            spec = spec.and(PerfilSpecification.pertenceALinha(idLinha));
        }
        if(dsPerfil != null){
            spec = spec.and(PerfilSpecification.descricaoContains(dsPerfil));
        }
        spec = spec.and(PerfilSpecification.ativo());

        return perfilRepository.findAll(spec, Sort.by("dsPerfil").ascending());
    }
    /*
    public List<Linha> findAll(Long idEmpresa, String dsLinha) {
        Specification<Linha> spec = Specification.where(null);

        if(idEmpresa != null && idEmpresa != 0){
            spec = spec.and(LinhaSpecification.pertenceAEmpresa(idEmpresa));
        }
        if(dsLinha != null){
            spec = spec.and(LinhaSpecification.descricaoContains(dsLinha));
        }
        spec = spec.and(LinhaSpecification.ativo());

        return linhaRepository.findAll(spec, Sort.by("dsLinha").ascending());
    }*/

    private void validaInsert(Perfil perfil) throws Exception{
        validaDescricao(perfil);

        if(perfil.getEmpresa() == null || perfil.getEmpresa().getIdEmpresa() == 0){
            throw new Exception("Não é possivel inserir um perfil no sistema sem vinculo com uma empresa. Entre em contato com os administradores do sistema.");
        }
        if(perfil.getLinha() == null || perfil.getLinha().getIdLinha() == 0){
            throw new Exception("Não é possivel inserir um perfil sem vinculo com uma linha. Verifique!");
        }
    }
    private void validaDescricao(Perfil perfil) throws Exception{
        perfil.setDsPerfil(perfil.getDsPerfil().trim().replaceAll("\\s+", " "));
        if(perfil.getDsPerfil().trim().length() < 3){
            throw new Exception("A descrição do perfil deve conter ao menos 3 caracteres.");
        }else if(perfil.getDsPerfil().trim().length() >60){
            throw new Exception("A descrição do perfil deve conter no máximo 60 caracteres.");
        }
    }
}
