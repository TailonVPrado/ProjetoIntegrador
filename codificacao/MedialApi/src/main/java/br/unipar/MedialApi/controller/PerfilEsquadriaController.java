package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.Perfil;
import br.unipar.MedialApi.model.PerfilEsquadria;
import br.unipar.MedialApi.model.dto.PerfilEsquadriaDto;
import br.unipar.MedialApi.service.PerfilEsquadriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/perfilesquadria")
public class PerfilEsquadriaController {

    @Autowired
    private PerfilEsquadriaService perfilEsquadriaService;

    @PostMapping
    public PerfilEsquadria insert (@RequestBody PerfilEsquadria perfilEsquadria) throws Exception{
        return perfilEsquadriaService.insert(perfilEsquadria);
    }

    @GetMapping(path = "/all")
    public List<PerfilEsquadriaDto> findByAll (@RequestParam(required = false) Long idEsquadria,
                                               @RequestParam(required = false) Long idPerfil) throws Exception{
        return perfilEsquadriaService.findAll(idEsquadria, idPerfil);
    }

    @DeleteMapping(path = "/{id}")
    public PerfilEsquadria delete(@PathVariable Long id) throws Exception{
        return perfilEsquadriaService.delete(id);
    }
}
