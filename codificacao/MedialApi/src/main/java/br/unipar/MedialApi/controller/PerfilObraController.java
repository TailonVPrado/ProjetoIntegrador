package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.dto.PerfilObraAgrupado;
import br.unipar.MedialApi.service.PerfilObraService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping(path = "/perfilobra")
@Api(description = "Controlador para operações relacionadas aos Perfis para corte de uma Obra (PerfilObra)")
public class PerfilObraController {

    @Autowired
    private PerfilObraService perfilObraService;

    @GetMapping(path = "/perfilobraagrupado")
    @ApiOperation(value = " Endpoint responsavel por retornar todos os perfis com descontos disponiveis para corte de forma agrupada")
    public List<PerfilObraAgrupado> findPerfilObraAgrupado(@RequestParam(required = false) Long idEsquadria,
                                                           @RequestParam(required = false) Long idObra,
                                                           @RequestParam(required = false) String dsCor,
                                                           @RequestParam(required = false) BigDecimal tmLargura,
                                                           @RequestParam(required = false) BigDecimal tmAltura) throws Exception{
        return perfilObraService.findPerfilObraAgrupado(idEsquadria, idObra, dsCor, tmLargura, tmAltura);
    }
}
