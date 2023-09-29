package br.unipar.MedialApi.service;

import br.unipar.MedialApi.model.Obra;
import br.unipar.MedialApi.model.Perfil;
import br.unipar.MedialApi.repository.ObraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ObraService {
    @Autowired
    private ObraRepository obraRepository;

    public Obra insert(Obra obra) throws Exception{
        validaInsert(obra);
        return obraRepository.saveAndFlush(obra);
    }

    private void validaInsert(Obra obra) throws Exception{
        validaDescricao(obra);
        validaDataLancamento(obra);
        validaFks(obra);
    }
    private void validaDescricao(Obra obra) throws Exception{
        obra.setDsObra(obra.getDsObra().trim().replaceAll("\\s+", " "));
        if(obra.getDsObra().trim().length() < 3){
            throw new Exception("A descrição da obra deve conter ao menos 3 caracteres.");
        }else if(obra.getDsObra().trim().length() >60){
            throw new Exception("A descrição da ovra deve conter no máximo 60 caracteres.");
        }
    }

    private void validaDataLancamento(Obra obra) throws Exception{
        if(obra.getDtLancamento().compareTo(new Date()) > 0){
            throw new Exception("A data de lançamento da obra não pode ser superior a data atual.");
        }
    }
    private void validaFks(Obra obra) throws Exception{
        if(obra.getEmpresa() == null || obra.getEmpresa().getIdEmpresa() == 0){
            throw new Exception("Não é possivel inserir ua obra no sistema sem vinculo com uma empresa. Entre em contato com os administradores do sistema.");
        }
    }
}
