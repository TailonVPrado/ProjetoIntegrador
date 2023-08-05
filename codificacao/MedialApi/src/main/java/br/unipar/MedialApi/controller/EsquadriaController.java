package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.Esquadria;
import br.unipar.MedialApi.service.EsquadriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/esquadria")
public class EsquadriaController {
    @Autowired
    private EsquadriaService esquadriaService;

    @PostMapping
    public Esquadria insert(@RequestBody Esquadria esquadria) throws Exception{
        return esquadriaService.insert(esquadria);
    }

    @PutMapping
    public Esquadria update(@RequestBody Esquadria esquadria) throws Exception{
        return esquadriaService.update(esquadria);
    }

    @GetMapping(path = "/{id}")
    public Esquadria findById(@PathVariable Long id) throws Exception{
        return esquadriaService.findById(id);
    }
}
