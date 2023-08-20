package br.unipar.MedialApi.specification;

import br.unipar.MedialApi.model.Perfil;
import org.springframework.data.jpa.domain.Specification;

public class PerfilSpecification {
    public static Specification<Perfil> descricaoContains(String descricao){
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.lower(root.get("dsPerfil")), "%" + descricao.toLowerCase()+"%");
    }
    public static Specification<Perfil> pertenceAEmpresa(Long idEmpresa) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("empresa").get("idEmpresa"), idEmpresa);
    }
    public static Specification<Perfil> pertenceALinha(Long idLinha) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("linha").get("idLinha"), idLinha);
    }
    public static Specification<Perfil> ativo() {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.isTrue(root.get("stAtivo"));
    }
}