package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.Perfil;
import br.unipar.MedialApi.model.PerfilEsquadria;
import br.unipar.MedialApi.model.dto.PerfilEsquadriaDto;
import br.unipar.MedialApi.service.PerfilEsquadriaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/perfilesquadria")
@Api(description = "Controlador para operações relacionadas ao Perfil da Esquadria (PerfilEsquadria)")
public class PerfilEsquadriaController {

    @Autowired
    private PerfilEsquadriaService perfilEsquadriaService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation(value = " Endpoint responsavel por criar um vinculo de um Perfil com uma Esquadria")
    public PerfilEsquadria insert (@RequestBody PerfilEsquadria perfilEsquadria) throws Exception{
        return perfilEsquadriaService.insert(perfilEsquadria);
    }

    @GetMapping(path = "/all")
    @ApiOperation(value = " Endpoint responsavel por retornar todos os vinculos ativos de Perfis de uma Esquadria especifica")
    public List<PerfilEsquadriaDto> findByAll (@RequestParam(required = false) Long idEsquadria,
                                               @RequestParam(required = false) Long idPerfil) throws Exception{
        return perfilEsquadriaService.findAll(idEsquadria, idPerfil);
    }

    @DeleteMapping(path = "/{id}")
    @ApiOperation(value = " Endpoint responsavel por desvincular um Perfil de uma Esquadria")
    public PerfilEsquadria delete(@PathVariable Long id) throws Exception{
        return perfilEsquadriaService.delete(id);
    }

    @PutMapping(path = "/{id}")
    @ApiOperation(value = " Endpoint responsavel por atualizar o vinculo de um Perfil com uma Esquadria")
    public PerfilEsquadria update (@PathVariable Long id,
                                   @RequestBody PerfilEsquadria perfilEsquadria) throws Exception{
        return perfilEsquadriaService.update(id, perfilEsquadria);
    }
}