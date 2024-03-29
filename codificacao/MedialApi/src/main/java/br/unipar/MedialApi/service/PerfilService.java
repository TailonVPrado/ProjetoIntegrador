package br.unipar.MedialApi.service;

import br.unipar.MedialApi.exception.EmpresaIndefinidaException;
import br.unipar.MedialApi.model.Perfil;
import br.unipar.MedialApi.model.dto.PerfilDto;
import br.unipar.MedialApi.model.dto.PerfilObraAgrupado;
import br.unipar.MedialApi.repository.PerfilRepository;
import br.unipar.MedialApi.specification.PerfilSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class PerfilService {

    @Autowired
    private PerfilRepository perfilRepository;

    public Perfil insert(Perfil perfil) throws Exception{
        validaInsert(perfil);
        perfil.setStAtivo(true);
        return perfilRepository.saveAndFlush(perfil);
    }

    public List<PerfilDto> findAll(Long idEmpresa, Long idLinha, String dsPerfil) throws Exception{
        if(idEmpresa == null || idEmpresa == 0){
            throw new EmpresaIndefinidaException();
        }

        Specification<Perfil> spec = Specification.where(null);
        spec = spec.and(PerfilSpecification.pertenceAEmpresa(idEmpresa));

        if(idLinha != null && idLinha != 0){
            spec = spec.and(PerfilSpecification.pertenceALinha(idLinha));
        }
        if(dsPerfil != null){
            spec = spec.and(PerfilSpecification.descricaoContains(dsPerfil));
        }
        spec = spec.and(PerfilSpecification.ativo());

        List<Perfil> perfis = perfilRepository.findAll(spec, Sort.by("dsPerfil").ascending());

        List<PerfilDto> perfilDtoList = new ArrayList<>();

        for (Perfil perfil: perfis) {
            PerfilDto perfilDto = new PerfilDto();
            perfilDto.setIdPerfil(perfil.getIdPerfil());
            perfilDto.setDsPerfil(perfil.getDsPerfil());
            perfilDto.setEmpresa(perfil.getEmpresa());
            perfilDto.setLinha(perfil.getLinha());

            if(perfil.getImPerfil() != null && perfil.getImPerfil().length != 0){
                perfilDto.setStNotContemImg(false);
            }else{
                perfilDto.setStNotContemImg(true);
            }

            perfilDtoList.add(perfilDto);
        }

        return perfilDtoList;
    }

    public Perfil update(Long id, Perfil obj) throws Exception{
        Perfil perfil = findById(id);

        perfil.setDsPerfil(obj.getDsPerfil());
        perfil.setLinha(obj.getLinha());

        validaUpdate(perfil);

        return perfilRepository.saveAndFlush(perfil);
    }

    @Transactional
    public Perfil delete(Long id) throws Exception {
        Perfil perfil = findById(id);

        perfil.setStAtivo(false);

        perfilRepository.save(perfil);
        return perfil;
    }

    public void validaInsert(Perfil perfil) throws Exception{
        validaDescricao(perfil);
        validaFks(perfil);
    }

    private void validaUpdate(Perfil perfil) throws Exception{
        validaDescricao(perfil);
        validaFks(perfil);
        if(perfil.getIdPerfil() == null || perfil.getIdPerfil() == 0){
            throw new Exception("Informe o ID para atualizar as informações do perfil");
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

    private void validaFks(Perfil perfil) throws Exception{
        if(perfil.getEmpresa() == null || perfil.getEmpresa().getIdEmpresa() == 0){
            throw new EmpresaIndefinidaException();
        }
        if(perfil.getLinha() == null || perfil.getLinha().getIdLinha() == 0){
            throw new Exception("Não é possível inserir um perfil sem vínculo com uma linha. Verifique!");
        }
    }


    public void setImage(Long id, Map<String, String> imagem) throws Exception {
        String image = imagem.get("image").replaceAll("data:image/jpeg;base64,", "");
        image = image.replaceAll("data:image/png;base64,", "");
        byte[] imageByte = Base64.getDecoder().decode(image);

        validaTamanhoImagem(imageByte);

        Perfil perfil = findById(id);
        perfil.setImPerfil(imageByte);

        perfilRepository.saveAndFlush(perfil);
    }

    private void validaTamanhoImagem(byte[] image) throws Exception{
        if(image != null && image.length/1024 >= 5120){
            throw new Exception("A imagem ultrapassa 5MB, escolha uma imagem menor.");
        }
    }


    public Perfil findById(Long id) throws Exception{
        Optional<Perfil> retorno = perfilRepository.findById(id);
        if(retorno.isPresent()){
            return retorno.get();
        }else{
            throw new Exception("Perfil com o ID ("+id+") não encontrado");
        }
    }

    public byte[] getImage(Long id) throws Exception {
        return findById(id).getImPerfil();
    }
}
