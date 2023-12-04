package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.Esquadria;
import br.unipar.MedialApi.model.dto.PerfilDto;
import br.unipar.MedialApi.service.EsquadriaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/esquadria")
@Api(description = "Controlador para operações relacionadas a Esquadrias")
public class EsquadriaController {
    @Autowired
    private EsquadriaService esquadriaService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation(value = " Endpoint responsavel por inserir uma nova Esquadria")
    public Esquadria insert(@RequestBody Esquadria esquadria) throws Exception{
        return esquadriaService.insert(esquadria);
    }

    @PutMapping(path = "/{id}")
    @ApiOperation(value = " Endpoint responsavel por atualizar uma Esquadria")
    public Esquadria update(@PathVariable Long id,
                            @RequestBody Esquadria esquadria) throws Exception{
        return esquadriaService.update(id, esquadria);
    }

    @GetMapping(path = "/{id}")
    @ApiOperation(value = " Endpoint responsavel por consultar uma Esquadria especifica pelo ID")
    public Esquadria findById(@PathVariable Long id) throws Exception{
        return esquadriaService.findById(id);
    }

    @GetMapping(path = "/all")
    @ApiOperation(value = " Endpoint responsavel por retornar todas as Esquadrias ativas no sistema")
    public List<Esquadria> findByAll (@RequestParam(required = false) Long idEmpresa,
                                      @RequestParam(required = false) Long idLinha,
                                      @RequestParam(required = false) String dsEsquadria) throws Exception{
        return esquadriaService.findAll(idEmpresa, idLinha, dsEsquadria);
    }

    @DeleteMapping(path = "{id}")
    @ApiOperation(value = " Endpoint responsavel por desativar uma Esquadrias do sistema")
    public Esquadria delete(@PathVariable Long id) throws Exception{
        return esquadriaService.delete(id);
    }
}
