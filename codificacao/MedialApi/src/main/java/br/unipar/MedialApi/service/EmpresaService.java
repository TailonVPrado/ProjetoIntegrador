package br.unipar.MedialApi.service;

import br.unipar.MedialApi.model.Empresa;
import br.unipar.MedialApi.model.Linha;
import br.unipar.MedialApi.repository.EmpresaRepository;
import br.unipar.MedialApi.repository.LinhaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmpresaService {
    @Autowired
    EmpresaRepository empresaRepository;

    public Empresa findById(Long id) throws Exception{
        Optional<Empresa> retorno = empresaRepository.findById(id);
        if(retorno.isPresent()){
            return retorno.get();
        }else{
            throw new Exception("Empresa com o ID ("+id+") não encontrada");
        }
    }
    public Empresa insert(Empresa empresa) throws Exception{
        validaInsert(empresa);
        return empresaRepository.saveAndFlush(empresa);
    }
    private void validaInsert(Empresa empresa) throws Exception{
        validaDescricao(empresa);
    }

    private void validaDescricao(Empresa empresa) throws Exception{
        empresa.setNmEmpresa(empresa.getNmEmpresa().trim().replaceAll("\\s+", " "));
        if(empresa.getNmEmpresa().trim().length() < 3){
            throw new Exception("A descrição da empresa deve conter ao menos 3 caracteres.");
        }else if(empresa.getNmEmpresa().trim().length() >60){
            throw new Exception("A descrição da empresa deve conter no máximo 60 caracteres.");
        }
    }
}
