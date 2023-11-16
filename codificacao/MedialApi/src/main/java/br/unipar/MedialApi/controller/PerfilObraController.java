package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.dto.PerfilObraAgrupado;
import br.unipar.MedialApi.service.PerfilObraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/perfilobra")
public class PerfilObraController {

    @Autowired
    private PerfilObraService perfilObraService;

    @GetMapping(path = "/perfilobraagrupado")
    public List<PerfilObraAgrupado> findPerfilObraAgrupado(@RequestParam(required = false) Long idEsquadria,
                                                           @RequestParam(required = false) Long idObra,
                                                           @RequestParam(required = false) String dsCor,
                                                           @RequestParam(required = false) Long tmLargura,
                                                           @RequestParam(required = false) Long tmAltura) throws Exception{
        return perfilObraService.findPerfilObraAgrupado(idEsquadria, idObra, dsCor, tmLargura, tmAltura);
    }
}
