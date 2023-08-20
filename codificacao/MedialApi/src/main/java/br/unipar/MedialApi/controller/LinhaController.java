package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.Linha;
import br.unipar.MedialApi.service.LinhaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/linha")
public class LinhaController {

    @Autowired
    private LinhaService linhaService;

    @PostMapping
    public Linha insert (@RequestBody Linha linha) throws Exception{
        return linhaService.insert(linha);
    }

    @PutMapping
    public Linha update (@RequestBody Linha linha) throws Exception{
        return linhaService.update(linha);
    }

    @GetMapping(path = "/{id}")
    public Linha findById (@PathVariable Long id) throws Exception{
        return linhaService.findById(id);
    }

    @GetMapping(path = "/all")
    public List<Linha> findByAll (@RequestParam(required = false) Long idEmpresa,
                                  @RequestParam(required = false) String dsLinha) throws Exception{
        return linhaService.findAll(idEmpresa, dsLinha);
    }
    
    @DeleteMapping(path = "/{id}")
    public Linha delete(@PathVariable Long id) throws Exception{
        return linhaService.delete(id);
    }

}
