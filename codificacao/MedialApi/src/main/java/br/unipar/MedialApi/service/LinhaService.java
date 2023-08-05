package br.unipar.MedialApi.service;

import br.unipar.MedialApi.model.Linha;
import br.unipar.MedialApi.repository.LinhaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
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
    private void validaUpdate(Linha linha)throws Exception{
        validaDescricao(linha);
        if(linha.getIdLinha() == null){
            throw new Exception("Informe o ID para atualizar as informações da linha");
        }
    }
    private void validaInsert(Linha linha) throws Exception{
        validaDescricao(linha);

        if(linha.getEmpresa() == null){
            throw new Exception("Não é possivel inserir uma linha no sistema sem vinculo com uma empresa. Entre em contato com os administradores do sistema.");
        }
    }
    private void validaDescricao(Linha linha) throws Exception{
        if(linha.getDsLinha().trim().length() < 3){
            throw new Exception("A descrição da linha deve conter ao menos 3 caracteres.");
        }else if(linha.getDsLinha().trim().length() >20){
            throw new Exception("A descrição da linha deve conter no máximo 20 caracteres.");
        }
    }

    public List<Linha> findByAll() {
        return linhaRepository.findAll();
    }

    public List<Linha> findByDescricao(Long idEmpresa, String dsLinha) {
        return linhaRepository.findByDesc(idEmpresa, "%"+dsLinha.replace(" ", "%")+"%");
    }
}
