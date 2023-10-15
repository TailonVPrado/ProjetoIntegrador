package br.unipar.MedialApi.specification;

import br.unipar.MedialApi.model.Obra;
import org.springframework.data.jpa.domain.Specification;

import java.util.Date;

public class ObraSpecification {
    public static Specification<Obra> descricaoContains(String descricao){
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.lower(root.get("dsObra")), "%" + descricao.toLowerCase()+"%");
    }
    public static Specification<Obra> pertenceAEmpresa(Long idEmpresa) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("empresa").get("idEmpresa"), idEmpresa);
    }
    public static Specification<Obra> lancamentoMaiorQue(Date dtLctoIni) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.greaterThanOrEqualTo(root.get("dtLancamento"), dtLctoIni);
    }

    public static Specification<Obra> lancamentoMenorQue(Date dtLctoFim) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.lessThanOrEqualTo(root.get("dtLancamento"), dtLctoFim);
    }


    public static Specification<Obra> ativo() {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.isTrue(root.get("stAtivo"));
    }
}
