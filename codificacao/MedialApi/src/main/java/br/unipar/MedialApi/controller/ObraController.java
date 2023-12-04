package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.Obra;
import br.unipar.MedialApi.service.ObraService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.core.io.InputStreamResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "/obra")
@Api(description = "Controlador para operações relacionadas a Obra")
public class ObraController {

    @Autowired
    private ObraService obraService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation(value = " Endpoint responsavel por inserir uma nova Obra")
    public Obra insert (@RequestBody Obra obra) throws Exception{
        return obraService.insert(obra);
    }

    @GetMapping(path = "/all")
    @ApiOperation(value = " Endpoint responsavel por retornar todas as Obras ativas no sistema")
    public List<Obra> findByAll (@RequestParam(required = false) Long idEmpresa,
                                 @RequestParam(required = false) String dsObra,
                                 @RequestParam(required = false) Date dtLctoIni,
                                 @RequestParam(required = false) Date dtLctoFim,
                                 @RequestParam(defaultValue = "0") Long limit,
                                 @RequestParam(defaultValue = "true") boolean retornarObrasJaImpressas) throws Exception{
        return obraService.findAll(idEmpresa, dsObra, dtLctoIni, dtLctoFim, limit, retornarObrasJaImpressas);
    }

    @DeleteMapping(path = "{id}")
    @ApiOperation(value = " Endpoint responsavel por desativar uma Obra do sistema")
    public Obra delete(@PathVariable Long id) throws Exception{
        return obraService.delete(id);
    }

    @PutMapping(path = "/{id}")
    @ApiOperation(value = " Endpoint responsavel por atualizar uma Obra")
    public Obra update (@PathVariable Long id,
                        @RequestBody Obra obra) throws Exception{
        return obraService.update(id, obra);
    }

    @PutMapping(path = "/recalcualarDescontos/{id}")
    @ApiOperation(value = " Endpoint responsavel por recalcular os descontos de uma Obra especifica pelo ID")
    public void recalcularDescontosObra(@PathVariable Long id) throws Exception{
        obraService.recalcularDescontosObra(id);
    }

    @GetMapping(path = "/{id}")
    @ApiOperation(value = " Endpoint responsavel por consultar uma Obra especifica pelo ID")
    public Obra findById(@PathVariable Long id) throws Exception{
        return obraService.findById(id);
    }

    @GetMapping("/gerarRelatorio/{id}")
    @ApiOperation(value = " Endpoint responsavel por retornar o relatório de cortes de uma obra especifica pelo ID")
    public ResponseEntity<InputStreamResource> gerarRelatorio(@PathVariable Long id) throws Exception{
        InputStream relatorioStream = obraService.gerarRelatorio(id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "relatorio.pdf");

        InputStreamResource inputStreamResource = new InputStreamResource(relatorioStream);

        return ResponseEntity.ok()
                .headers(headers)
                .body(inputStreamResource);
    }

}