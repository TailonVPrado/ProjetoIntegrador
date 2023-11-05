package br.unipar.MedialApi.controller;

import br.unipar.MedialApi.model.Empresa;
import br.unipar.MedialApi.service.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/empresa")
public class EmpresaController {
	@Autowired
	private EmpresaService empresaService;

	@GetMapping(path = "/{id}")
	public Empresa findById (@PathVariable Long id) throws Exception{
		return empresaService.findById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Empresa insert (@RequestBody Empresa empresa) throws Exception{
		return empresaService.insert(empresa);
	}
}
