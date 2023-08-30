package br.unipar.MedialApi.specification;

import br.unipar.MedialApi.model.Perfil;
import br.unipar.MedialApi.model.PerfilEsquadria;
import org.springframework.data.jpa.domain.Specification;

public class PerfilEsquadriaSpecification {

    public static Specification<PerfilEsquadria> pertenceAEsquadria(Long idEsquadria) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("esquadria").get("idEsquadria"), idEsquadria);
    }
    public static Specification<PerfilEsquadria> pertenceAOPerfil(Long idPerfil) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("perfil").get("idPerfil"), idPerfil);
    }
    public static Specification<PerfilEsquadria> ativo() {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.isTrue(root.get("stAtivo"));
    }
}
