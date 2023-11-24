package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.Obra;
import br.unipar.MedialApi.service.ObraService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.io.InputStream;
import java.nio.charset.StandardCharsets;
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

    @PutMapping(path = "/{id}")
    public Obra update (@PathVariable Long id,
                        @RequestBody Obra obra) throws Exception{
        return obraService.update(id, obra);
    }

    @PutMapping(path = "/recalcualarDescontos/{id}")
    public void recalcularDescontosObra(@PathVariable Long id) throws Exception{
        obraService.recalcularDescontosObra(id);
    }

    @GetMapping(path = "/{id}")
    public Obra findById(@PathVariable Long id) throws Exception{
        return obraService.findById(id);
    }

    @GetMapping("/gerarRelatorio/{id}")
    public ResponseEntity<InputStreamResource> gerarRelatorio(@PathVariable Long id) throws Exception{
        InputStream relatorioStream = obraService.gerarRelatorio(id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "relatorio.pdf");

        InputStreamResource inputStreamResource = new InputStreamResource(relatorioStream);

        return ResponseEntity.ok()
                .headers(headers)
                .body(inputStreamResource);
    }

}