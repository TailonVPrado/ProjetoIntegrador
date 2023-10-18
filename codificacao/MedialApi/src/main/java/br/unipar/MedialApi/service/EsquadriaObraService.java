package br.unipar.MedialApi.service;

import br.unipar.MedialApi.model.EsquadriaObra;
import br.unipar.MedialApi.repository.EsquadriaObraRepository;
import br.unipar.MedialApi.specification.EsquadriaObraSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import java.util.List;

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
}
