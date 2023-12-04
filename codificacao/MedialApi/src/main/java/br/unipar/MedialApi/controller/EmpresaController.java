package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.Empresa;
import br.unipar.MedialApi.service.EmpresaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/empresa")
@Api(description = "Controlador para operações relacionadas a empresas")
public class EmpresaController {
	@Autowired
	private EmpresaService empresaService;

	@GetMapping(path = "/{id}")
	@ApiOperation(value = " Endpoint responsavel por consultar uma Empresa especifica pelo ID")
	public Empresa findById (@PathVariable Long id) throws Exception{
		return empresaService.findById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@ApiOperation(value = " Endpoint responsavel por inserir uma nova Empresa")
	public Empresa insert (@RequestBody Empresa empresa) throws Exception{
		return empresaService.insert(empresa);
	}
}
