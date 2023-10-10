package br.unipar.MedialApi.service;

import br.unipar.MedialApi.model.Obra;
import br.unipar.MedialApi.model.Perfil;
import br.unipar.MedialApi.model.dto.PerfilDto;
import br.unipar.MedialApi.repository.ObraRepository;
import br.unipar.MedialApi.specification.ObraSpecification;
import br.unipar.MedialApi.specification.PerfilSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ObraService {
    @Autowired
    private ObraRepository obraRepository;

    public Obra insert(Obra obra) throws Exception{
        validaInsert(obra);
        obra.setNrVersao(1);
        return obraRepository.saveAndFlush(obra);
    }

    public List<Obra> findAll(Long idEmpresa, String dsObra){
        Specification<Obra> spec = Specification.where(null);

        if(idEmpresa != null && idEmpresa != 0){
            spec = spec.and(ObraSpecification.pertenceAEmpresa(idEmpresa));
        }
        if(dsObra != null){
            spec = spec.and(ObraSpecification.descricaoContains(dsObra));
        }
        spec = spec.and(ObraSpecification.ativo());

        return obraRepository.findAll(spec, Sort.by("dtLancamento").descending());
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
            throw new Exception("A descrição da obra deve conter no máximo 60 caracteres.");
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

    /*
    public List<PerfilDto> findAll(Long idEmpresa, String dsObra, Date dtLctoIni, Date dtLctoFim) {

        return new List<new PerfilDto()>();
    }

    public Page<Obra> findAll(Pageable pageable) {
        return obraRepository.findAll(pageable);
    }*/
}
