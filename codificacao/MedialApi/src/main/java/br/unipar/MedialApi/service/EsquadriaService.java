package br.unipar.MedialApi.service;

import br.unipar.MedialApi.model.Esquadria;
import br.unipar.MedialApi.repository.EsquadriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EsquadriaService {
    @Autowired
    private EsquadriaRepository esquadriaRepository;

    public Esquadria insert(Esquadria esquadria) throws Exception{
        validaInsert(esquadria);
        return esquadriaRepository.saveAndFlush(esquadria);
    }

    public Esquadria update(Esquadria esquadria) throws Exception{
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

    private void validaInsert(Esquadria esquadria) throws Exception{
        validaDefault(esquadria);

    }

    private void validaUpdate(Esquadria esquadria) throws Exception{
        validaDefault(esquadria);
        if(esquadria.getIdEsquadria() == null) {
            throw new Exception("Informe o ID para atualizar as informações da esquadria");
        }
    }

    private void validaDefault(Esquadria esquadria) throws Exception{
        if(esquadria.getDsEsquadria().trim().length() < 3){
            throw new Exception("A descrição da esquadria deve conter ao menos 3 caracteres");
        }else if(esquadria.getDsEsquadria().trim().length() >60){
            throw new Exception("A descrição da esquadria deve conter no máximo 60 caracteres");
        } else if(esquadria.getLinha() == null){
            throw new Exception("Informe uma linha válida para continuar");
        }
    }
}
