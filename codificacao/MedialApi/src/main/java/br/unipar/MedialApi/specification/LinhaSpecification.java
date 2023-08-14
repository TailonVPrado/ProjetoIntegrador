package br.unipar.MedialApi.specification;

import br.unipar.MedialApi.model.Linha;
import org.springframework.data.jpa.domain.Specification;

public class LinhaSpecification {
    public static Specification<Linha> descricaoContains(String descricao) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.lower(root.get("dsLinha")), "%" + descricao.toLowerCase() + "%");
    }

    public static Specification<Linha> pertenceAEmpresa(Long idEmpresa) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("empresa").get("idEmpresa"), idEmpresa);
    }
    public static Specification<Linha> ativo() {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.isTrue(root.get("stAtivo"));
    }

}
