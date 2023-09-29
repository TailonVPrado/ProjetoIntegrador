package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.Obra;
import br.unipar.MedialApi.service.ObraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/obra")
public class ObraController {

    @Autowired
    private ObraService obraService;

    @PostMapping
    public Obra insert (@RequestBody Obra obra) throws Exception{
        return obraService.insert(obra);
    }
}
