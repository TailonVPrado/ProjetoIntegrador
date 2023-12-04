package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.Linha;
import br.unipar.MedialApi.service.LinhaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/linha")
@Api(description = "Controlador para operações relacionadas a Linha")
public class LinhaController {

    @Autowired
    private LinhaService linhaService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation(value = " Endpoint responsavel por inserir uma nova Linha")
    public Linha insert (@RequestBody Linha linha) throws Exception{
        return linhaService.insert(linha);
    }

    @PutMapping(path = "/{id}")
    @ApiOperation(value = " Endpoint responsavel por atualizar uma Linha")
    public Linha update ( @PathVariable Long id,
                          @RequestBody Linha linha) throws Exception{
        return linhaService.update(id, linha);
    }

    @GetMapping(path = "/{id}")
    @ApiOperation(value = " Endpoint responsavel por consultar uma Linha especifica pelo ID")
    public Linha findById (@PathVariable Long id) throws Exception{
        return linhaService.findById(id);
    }

    @GetMapping(path = "/all")
    @ApiOperation(value = " Endpoint responsavel por retornar todas as Linhas ativas no sistema")
    public List<Linha> findByAll (@RequestParam(required = false) Long idEmpresa,
                                  @RequestParam(required = false) String dsLinha) throws Exception{
        return linhaService.findAll(idEmpresa, dsLinha);
    }
    
    @DeleteMapping(path = "/{id}")
    @ApiOperation(value = " Endpoint responsavel por desativar uma Linha do sistema")
    public Linha delete(@PathVariable Long id) throws Exception{
        return linhaService.delete(id);
    }

}
