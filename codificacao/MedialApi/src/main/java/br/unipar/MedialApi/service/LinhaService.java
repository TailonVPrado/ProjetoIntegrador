package br.unipar.MedialApi.service;

import br.unipar.MedialApi.exception.EmpresaIndefinidaException;
import br.unipar.MedialApi.model.Linha;
import br.unipar.MedialApi.repository.EmpresaRepository;
import br.unipar.MedialApi.repository.EsquadriaRepository;
import br.unipar.MedialApi.repository.LinhaRepository;
import br.unipar.MedialApi.repository.PerfilRepository;
import br.unipar.MedialApi.specification.LinhaSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class LinhaService {

    @Autowired
    private LinhaRepository linhaRepository;

    public Linha insert(Linha linha) throws Exception{
        validaInsert(linha);
        return linhaRepository.saveAndFlush(linha);
    }

    public Linha update(Linha linha) throws Exception{
        validaUpdate(linha);
        return linhaRepository.saveAndFlush(linha);
    }

    public Linha findById(Long id) throws Exception{
        Optional<Linha> retorno = linhaRepository.findById(id);
        if(retorno.isPresent()){
            return retorno.get();
        }else{
            throw new Exception("Linha com o ID ("+id+") não encontrada");
        }
    }


    public List<Linha> findAll(Long idEmpresa, String dsLinha) throws Exception{
        if(idEmpresa == null || idEmpresa == 0){
            throw new EmpresaIndefinidaException();
        }

        Specification<Linha> spec = Specification.where(null);

        spec = spec.and(LinhaSpecification.pertenceAEmpresa(idEmpresa));

        if(dsLinha != null){
            spec = spec.and(LinhaSpecification.descricaoContains(dsLinha));
        }
        spec = spec.and(LinhaSpecification.ativo());

        return linhaRepository.findAll(spec, Sort.by("dsLinha").ascending());
    }

    @Transactional
    public Linha delete(Long id) throws Exception {
        Linha linha = findById(id);
        linha.setStAtivo(false);

        //tenho que apagar todos os registros que possuem ligação com a linha
        /*List<Perfil> perfis = perfilRepository.findByLinha(linha);
        for (Perfil perfil: perfis) {
            perfil.setStAtivo(false);
        }

        List<Esquadria> esquadrias = esquadriaRepository.findByLinha(linha);
        for (Esquadria esquadria: esquadrias) {
            esquadria.setStAtivo(false);
        }

        perfilRepository.saveAll(perfis);
        esquadriaRepository.saveAll(esquadrias);*/
        linhaRepository.save(linha);
        return linha;
    }

    private void validaUpdate(Linha linha)throws Exception{
        validaDescricao(linha);
        validaFks(linha);
        if(linha.getIdLinha() == null || linha.getIdLinha() == 0){
            throw new Exception("Informe o ID para atualizar as informações da linha");
        }
    }

    public void validaInsert(Linha linha) throws Exception{
        validaDescricao(linha);
        validaFks(linha);
    }

    private void validaDescricao(Linha linha) throws Exception{
        linha.setDsLinha(linha.getDsLinha().trim().replaceAll("\\s+", " "));
        if(linha.getDsLinha().trim().length() < 3){
            throw new Exception("A descrição da linha deve conter ao menos 3 caracteres.");
        }else if(linha.getDsLinha().trim().length() >20){
            throw new Exception("A descrição da linha deve conter no máximo 20 caracteres.");
        }
    }

    private void validaFks(Linha linha) throws Exception{
        if(linha.getEmpresa() == null || linha.getEmpresa().getIdEmpresa() == 0 ){
            throw new EmpresaIndefinidaException();
        }
    }
}
