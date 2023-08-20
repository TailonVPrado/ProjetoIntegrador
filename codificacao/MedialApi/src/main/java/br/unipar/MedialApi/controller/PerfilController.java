package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.Linha;
import br.unipar.MedialApi.model.Perfil;
import br.unipar.MedialApi.service.PerfilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/perfil")
public class PerfilController {
    @Autowired
    private PerfilService perfilService;

    @GetMapping(path = "/all")
    public List<Perfil> findByAll (@RequestParam(required = false) Long idEmpresa,
                                   @RequestParam(required = false) Long idLinha,
                                   @RequestParam(required = false) String dsPerfil) throws Exception{
        return perfilService.findAll(idEmpresa, idLinha, dsPerfil);
    }

    @PostMapping
    public Perfil insert (@RequestBody Perfil perfil) throws Exception{
        return perfilService.insert(perfil);
    }
    @DeleteMapping(path = "/{id}")
    public Perfil delete(@PathVariable Long id) throws Exception{
        return perfilService.delete(id);
    }
}
