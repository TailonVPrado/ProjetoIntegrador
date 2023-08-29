package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.Perfil;
import br.unipar.MedialApi.model.PerfilEsquadria;
import br.unipar.MedialApi.service.PerfilEsquadriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/perfilesquadria")
public class PerfilEsquadriaController {
    @Autowired
    private PerfilEsquadriaService perfilEsquadriaService;
    @PostMapping
    public PerfilEsquadria insert (@RequestBody PerfilEsquadria perfilEsquadria) throws Exception{
        return perfilEsquadriaService.insert(perfilEsquadria);
    }
}
