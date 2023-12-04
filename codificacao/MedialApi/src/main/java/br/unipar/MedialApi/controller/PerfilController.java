package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.Linha;
import br.unipar.MedialApi.model.Perfil;
import br.unipar.MedialApi.model.dto.PerfilDto;
import br.unipar.MedialApi.service.PerfilService;
import io.swagger.annotations.ApiOperation;
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
    @ApiOperation(value = " Endpoint responsavel por retornar todos os Perfis ativos no sistema")
    public List<PerfilDto> findByAll (@RequestParam(required = false) Long idEmpresa,
                                      @RequestParam(required = false) Long idLinha,
                                      @RequestParam(required = false) String dsPerfil) throws Exception{
        return perfilService.findAll(idEmpresa, idLinha, dsPerfil);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation(value = " Endpoint responsavel por inserir um novo Perfil")
    public Perfil insert (@RequestBody Perfil perfil) throws Exception{
        return perfilService.insert(perfil);
    }
    @DeleteMapping(path = "/{id}")
    @ApiOperation(value = " Endpoint responsavel por desativar um Perfil do sistema")
    public Perfil delete(@PathVariable Long id) throws Exception{
        return perfilService.delete(id);
    }

    @PutMapping(path = "/{id}")
    @ApiOperation(value = " Endpoint responsavel por atualizar um Perfil")
    public Perfil update (@PathVariable Long id,
                          @RequestBody Perfil perfil) throws Exception{
        return perfilService.update(id, perfil);
    }

    @PutMapping(path = "/updateImage/{id}")
    @ApiOperation(value = " Endpoint responsavel por atualizar a imagem de um Perfil especifico pelo ID")
    public void setImagemPerfil(@PathVariable Long id,
                                @RequestBody Map<String, String> imagem) throws Exception{
        perfilService.setImage(id, imagem);
    }

    @GetMapping(path = "/getImage/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
    @ApiOperation(value = " Endpoint responsavel por retornar a imagem de um Perfil especifico pelo ID")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) throws Exception {
        byte[] imageBytes = perfilService.getImage(id);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    @ApiOperation(value = " Endpoint responsavel por consultar um Perfil especifico pelo ID")
    public Perfil findById (@PathVariable Long id) throws Exception{
        return perfilService.findById(id);
    }

}
