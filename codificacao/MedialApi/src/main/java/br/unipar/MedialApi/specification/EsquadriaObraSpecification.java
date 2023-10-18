package br.unipar.MedialApi.specification;

import br.unipar.MedialApi.model.EsquadriaObra;
import br.unipar.MedialApi.model.PerfilEsquadria;
import org.springframework.data.jpa.domain.Specification;

public class EsquadriaObraSpecification {
    public static Specification<EsquadriaObra> pertenceAObra(Long idObra) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("obra").get("idObra"), idObra);
    }
    public static Specification<EsquadriaObra> pertenceAEsquadria(Long idEsquadria) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("esquadria").get("idEsquadria"), idEsquadria);
    }
    public static Specification<EsquadriaObra> ativo() {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.isTrue(root.get("stAtivo"));
    }
}
