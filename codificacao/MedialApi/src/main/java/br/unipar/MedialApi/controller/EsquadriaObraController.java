package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.EsquadriaObra;
import br.unipar.MedialApi.model.dto.EsquadriaObraAgrupadaDto;
import br.unipar.MedialApi.model.enumModel.CorEnum;
import br.unipar.MedialApi.service.EsquadriaObraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/esquadriaobra")
public class EsquadriaObraController {
    @Autowired
    private EsquadriaObraService esquadriaObraService;
    @GetMapping(path = "/all")
    public List<EsquadriaObra> findByAll (@RequestParam(required = false) Long idObra,
                                          @RequestParam(required = false) Long idEsquadria) throws Exception{
        return esquadriaObraService.findAll(idObra, idEsquadria);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EsquadriaObra insert (@RequestBody EsquadriaObra esquadriaObra) throws Exception{
        return esquadriaObraService.insert(esquadriaObra);
    }

    @DeleteMapping(path = "/{id}")
    public EsquadriaObra delete(@PathVariable Long id) throws Exception{
        return esquadriaObraService.delete(id);
    }

    @PutMapping(path = "/{id}")
    public EsquadriaObra update (@PathVariable Long id,
                                 @RequestBody EsquadriaObra esquadriaObra) throws Exception{
        return esquadriaObraService.update(id, esquadriaObra);
    }

    @GetMapping(path = "/cores")
    private List<CorEnum> getCores(){
        return esquadriaObraService.getCores();
    }

    @GetMapping(path = "/proximoCodigo")
    public String retornaProximoCodigoEsquadria(@RequestParam(required = false) String cdCodigo){
        return esquadriaObraService.retornaProximoCodigoEsquadria(cdCodigo);
    }

    @PostMapping(path = "/duplicar")
    @ResponseStatus(HttpStatus.CREATED)
    public EsquadriaObra duplicar (@RequestBody EsquadriaObra esquadriaObra) throws Exception{
        return esquadriaObraService.duplicarEsquadriaObra(esquadriaObra);
    }

    @GetMapping(path = "/all/agrupado/{idObra}")
    public List<EsquadriaObraAgrupadaDto> findAllAgrupado (@PathVariable Long idObra) {
        return esquadriaObraService.findAllAgrupado(idObra);
    }
}