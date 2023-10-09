package br.unipar.MedialApi.specification;

import br.unipar.MedialApi.model.Obra;
import org.springframework.data.jpa.domain.Specification;

public class ObraSpecification {
    public static Specification<Obra> descricaoContains(String descricao){
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.lower(root.get("dsObra")), "%" + descricao.toLowerCase()+"%");
    }
    public static Specification<Obra> pertenceAEmpresa(Long idEmpresa) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("empresa").get("idEmpresa"), idEmpresa);
    }
    public static Specification<Obra> ativo() {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.isTrue(root.get("stAtivo"));
    }
}
