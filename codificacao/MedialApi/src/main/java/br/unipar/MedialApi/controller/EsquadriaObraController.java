package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.EsquadriaObra;
import br.unipar.MedialApi.model.dto.EsquadriaObraAgrupadaDto;
import br.unipar.MedialApi.model.enumModel.CorEnum;
import br.unipar.MedialApi.service.EsquadriaObraService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/esquadriaobra")
@Api(description = "Controlador para operações relacionadas a Esquadria da Obra (EsquadriaObra)")
public class EsquadriaObraController {
    @Autowired
    private EsquadriaObraService esquadriaObraService;


    @GetMapping(path = "/all")
    @ApiOperation(value = " Endpoint responsavel por retornar todos os vinculos ativos de Esquadrias de uma obra especifica")
    public List<EsquadriaObra> findByAll (@RequestParam(required = false) Long idObra,
                                          @RequestParam(required = false) Long idEsquadria) throws Exception{
        return esquadriaObraService.findAll(idObra, idEsquadria);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation(value = " Endpoint responsavel por criar um vinculo de Esquadria com uma Obra")
    public EsquadriaObra insert (@RequestBody EsquadriaObra esquadriaObra) throws Exception{
        return esquadriaObraService.insert(esquadriaObra);
    }

    @DeleteMapping(path = "/{id}")
    @ApiOperation(value = " Endpoint responsavel por desvincular uma Esquadria de uma Obra")
    public EsquadriaObra delete(@PathVariable Long id) throws Exception{
        return esquadriaObraService.delete(id);
    }

    @PutMapping(path = "/{id}")
    @ApiOperation(value = " Endpoint responsavel por atualizar o vinculo de uma Esquadria com uma Obra")
    public EsquadriaObra update (@PathVariable Long id,
                                 @RequestBody EsquadriaObra esquadriaObra) throws Exception{
        return esquadriaObraService.update(id, esquadriaObra);
    }

    @GetMapping(path = "/cores")
    @ApiOperation(value = " Endpoint responsavel por retornar todas as cores disponiveis de esquadrias")
    private List<CorEnum> getCores(){
        return esquadriaObraService.getCores();
    }

    @GetMapping(path = "/proximoCodigo")
    @ApiOperation(value = " Endpoint responsavel por retornar o próximo codigo de esquadria de uma obra com base no anterior")
    public String retornaProximoCodigoEsquadria(@RequestParam(required = false) String cdCodigo){
        return esquadriaObraService.retornaProximoCodigoEsquadria(cdCodigo);
    }

    @PostMapping(path = "/duplicar")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation(value = " Endpoint responsavel por duplicar o vinculo de uma esquadria com uma Obra")
    public EsquadriaObra duplicar (@RequestBody EsquadriaObra esquadriaObra) throws Exception{
        return esquadriaObraService.duplicarEsquadriaObra(esquadriaObra);
    }

    @GetMapping(path = "/all/agrupado/{idObra}")
    @ApiOperation(value = " Endpoint responsavel por retornar todas as esquadrias de uma determinada Obra, mas de forma agrupada")
    public List<EsquadriaObraAgrupadaDto> findAllAgrupado (@PathVariable Long idObra) {
        return esquadriaObraService.findAllAgrupado(idObra);
    }
}