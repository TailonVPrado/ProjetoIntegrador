package br.unipar.MedialApi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.unipar.MedialApi.model.Empresa;
import br.unipar.MedialApi.model.dto.ExceptionDTO;
import br.unipar.MedialApi.service.EmpresaService;

@RestController
@RequestMapping(path = "/empresa")
public class EmpresaController {
	@Autowired
	private EmpresaService EmpresaService;
	//@PageableDefault()
	/*
	@GetMapping(path = "/{id}")
	public ResponseEntity<Page<Empresa>> findById(@PageableDefault()
													@PathVariable Long id){
	}

	@PostMapping
	public ResponseEntity<Page<Empresa>> insert(@RequestBody Empresa empresa)  {
		try {
			return ResponseEntity.ok(empresaService.insert(empresa));
		}catch (Exception e) {
			ExceptionDTO dto = new ExceptionDTO(e.getMessage());
			return ResponseEntity.badRequest().body(dto);
		}
	}*/
	
}
