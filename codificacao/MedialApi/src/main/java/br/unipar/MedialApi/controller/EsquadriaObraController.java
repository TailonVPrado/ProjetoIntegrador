package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.EsquadriaObra;
import br.unipar.MedialApi.model.PerfilEsquadria;
import br.unipar.MedialApi.model.enumModel.CorEnum;
import br.unipar.MedialApi.service.EsquadriaObraService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public EsquadriaObra insert (@RequestBody EsquadriaObra esquadriaObra) throws Exception{
        return esquadriaObraService.insert(esquadriaObra);
    }

    @DeleteMapping(path = "/{id}")
    public EsquadriaObra delete(@PathVariable Long id) throws Exception{
        return esquadriaObraService.delete(id);
    }

    @GetMapping(path = "/cores")
    private List<CorEnum> getCores(){
        return esquadriaObraService.getCotes();
    }
}
