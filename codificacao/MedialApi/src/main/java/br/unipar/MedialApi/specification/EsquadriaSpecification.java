package br.unipar.MedialApi.specification;

import br.unipar.MedialApi.model.Esquadria;
import br.unipar.MedialApi.model.Perfil;
import org.springframework.data.jpa.domain.Specification;

public class EsquadriaSpecification {
    public static Specification<Esquadria> descricaoContains(String descricao){
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.lower(root.get("dsEsquadria")), "%" + descricao.toLowerCase()+"%");
    }
    public static Specification<Esquadria> pertenceAEmpresa(Long idEmpresa) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("empresa").get("idEmpresa"), idEmpresa);
    }
    public static Specification<Esquadria> pertenceALinha(Long idLinha) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("linha").get("idLinha"), idLinha);
    }
    public static Specification<Esquadria> ativo() {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.isTrue(root.get("stAtivo"));
    }
}
