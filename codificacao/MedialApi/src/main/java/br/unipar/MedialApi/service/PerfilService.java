package br.unipar.MedialApi.service;

import br.unipar.MedialApi.model.Perfil;
import br.unipar.MedialApi.repository.LinhaRepository;
import br.unipar.MedialApi.repository.PerfilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PerfilService {

    @Autowired
    private PerfilRepository perfilRepository;

    public List<Perfil> findAll(){
        return perfilRepository.findAll();
    }

}
