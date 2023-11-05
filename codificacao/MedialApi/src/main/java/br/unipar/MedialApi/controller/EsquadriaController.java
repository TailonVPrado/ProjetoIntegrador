package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.Esquadria;
import br.unipar.MedialApi.model.dto.PerfilDto;
import br.unipar.MedialApi.service.EsquadriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/esquadria")
public class EsquadriaController {
    @Autowired
    private EsquadriaService esquadriaService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Esquadria insert(@RequestBody Esquadria esquadria) throws Exception{
        return esquadriaService.insert(esquadria);
    }

    @PutMapping(path = "/{id}")
    public Esquadria update(@PathVariable Long id,
                            @RequestBody Esquadria esquadria) throws Exception{
        return esquadriaService.update(id, esquadria);
    }

    @GetMapping(path = "/{id}")
    public Esquadria findById(@PathVariable Long id) throws Exception{
        return esquadriaService.findById(id);
    }

    @GetMapping(path = "/all")
    public List<Esquadria> findByAll (@RequestParam(required = false) Long idEmpresa,
                                      @RequestParam(required = false) Long idLinha,
                                      @RequestParam(required = false) String dsEsquadria) throws Exception{
        return esquadriaService.findAll(idEmpresa, idLinha, dsEsquadria);
    }

    @DeleteMapping(path = "{id}")
    public Esquadria delete(@PathVariable Long id) throws Exception{
        return esquadriaService.delete(id);
    }
}
