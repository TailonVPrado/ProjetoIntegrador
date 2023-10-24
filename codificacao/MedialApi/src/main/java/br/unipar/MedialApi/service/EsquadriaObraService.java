package br.unipar.MedialApi.service;

import br.unipar.MedialApi.model.EsquadriaObra;
import br.unipar.MedialApi.model.PerfilEsquadria;
import br.unipar.MedialApi.model.enumModel.CorEnum;
import br.unipar.MedialApi.repository.EsquadriaObraRepository;
import br.unipar.MedialApi.specification.EsquadriaObraSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class EsquadriaObraService {
    @Autowired
    private EsquadriaObraRepository esquadriaObraRepository;

    public List<EsquadriaObra> findAll (Long idObra, Long idEsquadria){
        Specification<EsquadriaObra> spec = Specification.where(null);

        if(idObra != null && idObra != 0){
            spec = spec.and(EsquadriaObraSpecification.pertenceAObra(idObra));
        }
        if(idEsquadria != null && idEsquadria != 0){
            spec = spec.and(EsquadriaObraSpecification.pertenceAEsquadria(idEsquadria));
        }
        spec = spec.and(EsquadriaObraSpecification.ativo());

        List<EsquadriaObra> esquadriaObras = esquadriaObraRepository.findAll(spec, Sort.by("esquadria.dsEsquadria").ascending());

        return esquadriaObras;
    }

    public EsquadriaObra insert (EsquadriaObra esquadriaObra) throws Exception{
        validaInsert(esquadriaObra);

        esquadriaObra.setStAtivo(true);
        return esquadriaObraRepository.saveAndFlush(esquadriaObra);
    }

    public EsquadriaObra delete (Long idEsquadriaObra) throws Exception{
        EsquadriaObra esquadriaObra = findById(idEsquadriaObra);

        esquadriaObra.setStAtivo(false);

        return esquadriaObraRepository.saveAndFlush(esquadriaObra);
    }

    public EsquadriaObra findById(Long id) throws Exception{
        Optional<EsquadriaObra> retorno = esquadriaObraRepository.findById(id);
        if(retorno.isPresent()){
            return retorno.get();
        }else{
            throw new Exception("Vinculo com o ID ("+id+") não encontrado");
        }
    }

    public List<CorEnum> getCotes() {
        return List.of(CorEnum.values());
    }

    private void validaInsert(EsquadriaObra esquadriaObra) throws Exception{
        validaFks(esquadriaObra);
        validaDefault(esquadriaObra);
    }
    private void validaFks(EsquadriaObra esquadriaObra)throws Exception{
        if(esquadriaObra.getObra() == null || esquadriaObra.getObra().getIdObra() == 0){
            throw new Exception("Informe a Obra para realizar o vinculo.");
        }
        if(esquadriaObra.getEsquadria() == null || esquadriaObra.getEsquadria().getIdEsquadria() == 0){
            throw new Exception("Informe a esquadria para realizar o vinculo com a obra.");
        }
    }
    private void validaDefault(EsquadriaObra esquadriaObra)throws Exception{

        esquadriaObra.setCdEsquadriaObra(esquadriaObra.getCdEsquadriaObra().trim().replaceAll("\\s+", " "));
        if(esquadriaObra.getCdEsquadriaObra() == null || esquadriaObra.getEsquadria().equals("")){
            throw new Exception("Informe o código da esquadria.");
        }
        if(esquadriaObra.getCdEsquadriaObra().trim().length() > 5){
            throw new Exception("O código da esquadria deve conter no máximo 5 caracteres.");
        }
        if(esquadriaObra.getTmAltura() == null || esquadriaObra.getTmAltura().compareTo(new BigDecimal(0)) <= 0){
            throw new Exception("Altura inválida, verifique!");
        }
        if(esquadriaObra.getTmLargura() == null || esquadriaObra.getTmLargura().compareTo(new BigDecimal(0)) <= 0){
            throw new Exception("Largura inválida, verifique!");
        }
        if(esquadriaObra.getDsCor() == null || esquadriaObra.getDsCor().equals(CorEnum.VAZIO) || esquadriaObra.getDsCor().toString().isEmpty()){
            throw new Exception("Informe a cor da esquadria.");
        }
    }
}
