package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.Obra;
import br.unipar.MedialApi.service.ObraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "/obra")
public class ObraController {

    @Autowired
    private ObraService obraService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Obra insert (@RequestBody Obra obra) throws Exception{
        return obraService.insert(obra);
    }

    @GetMapping(path = "/all")
    public List<Obra> findByAll (@RequestParam(required = false) Long idEmpresa,
                                 @RequestParam(required = false) String dsObra,
                                 @RequestParam(required = false) Date dtLctoIni,
                                 @RequestParam(required = false) Date dtLctoFim,
                                 @RequestParam(defaultValue = "0") Long limit,
                                 @RequestParam(defaultValue = "true") boolean retornarObrasJaImpressas) throws Exception{
        return obraService.findAll(idEmpresa, dsObra, dtLctoIni, dtLctoFim, limit, retornarObrasJaImpressas);
    }

    @DeleteMapping(path = "{id}")
    public Obra delete(@PathVariable Long id) throws Exception{
        return obraService.delete(id);
    }

    @PutMapping
    public Obra update (@RequestBody Obra obra) throws Exception{
        return obraService.update(obra);
    }

    @PutMapping(path = "/recalcualarDescontos")
    public void recalcularDescontosObra(@RequestBody Obra obra){
        obraService.recalcularDescontosObra(obra);
    }

    @GetMapping(path = "/{id}")
    public Obra findById(@PathVariable Long id) throws Exception{
        return obraService.findById(id);
    }

}