package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.Linha;
import br.unipar.MedialApi.model.Perfil;
import br.unipar.MedialApi.model.dto.PerfilDto;
import br.unipar.MedialApi.service.PerfilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/perfil")
public class PerfilController {
    @Autowired
    private PerfilService perfilService;

    @GetMapping(path = "/all")
    public List<PerfilDto> findByAll (@RequestParam(required = false) Long idEmpresa,
                                      @RequestParam(required = false) Long idLinha,
                                      @RequestParam(required = false) String dsPerfil) throws Exception{
        return perfilService.findAll(idEmpresa, idLinha, dsPerfil);
    }

    @PostMapping
    public Perfil insert (@RequestBody Perfil perfil) throws Exception{
        return perfilService.insert(perfil);
    }
    @DeleteMapping(path = "/{id}")
    public Perfil delete(@PathVariable Long id) throws Exception{
        return perfilService.delete(id);
    }
    @PutMapping
    public Perfil update (@RequestBody Perfil perfil) throws Exception{
        return perfilService.update(perfil);
    }
    @PostMapping(path = "/updateImage/{id}")
    public void setImagemPerfil(@PathVariable Long id,@RequestBody Map<String, String> imagem) throws Exception{
        perfilService.addImage(id, imagem);
    }

    @GetMapping(path = "/getImage/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) throws Exception {
        byte[] imageBytes = perfilService.getImage(id);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }
}
