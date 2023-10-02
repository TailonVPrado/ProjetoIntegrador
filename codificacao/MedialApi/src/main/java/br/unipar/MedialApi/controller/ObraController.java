package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.Obra;
import br.unipar.MedialApi.model.dto.PerfilDto;
import br.unipar.MedialApi.service.ObraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "/obra")
public class ObraController {

    @Autowired
    private ObraService obraService;

    @PostMapping
    public Obra insert (@RequestBody Obra obra) throws Exception{
        return obraService.insert(obra);
    }
/*
    @GetMapping(path = "/all")
    public ResponseEntity<Page<Obra>> findByAll (@RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "10") int size){

        Pageable pageable = PageRequest.of(page, size);
        Page<Obra> obras = obraService.findAll(pageable);
        return ResponseEntity.ok(obras);
        //return obraService.findAll(idEmpresa, dsObra, dtLctoIni, dtLctoFim);
    }*/
}
/*
    @RequestParam(required = false) Long idEmpresa,
    @RequestParam(required = false) String dsObra,
    @RequestParam(required = false) Date dtLctoIni,
    @RequestParam(required = false) Date dtLctoFim
*/