package br.unipar.MedialApi.repository;

import br.unipar.MedialApi.model.PerfilEsquadria;
import br.unipar.MedialApi.model.dto.ObraCorteDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.unipar.MedialApi.model.EsquadriaObra;

import java.util.List;

@Repository
public interface EsquadriaObraRepository extends JpaRepository<EsquadriaObra, Long>, JpaSpecificationExecutor<EsquadriaObra> {
    @Query(value = "SELECT e.id_Obra as idObra, " +
                          "e.id_Esquadria as idEsquadria, " +
                          "e.ds_Cor as dsCor, " +
                          "e.tm_Largura as tmLargura, " +
                          "e.tm_Altura as tmAltura, " +
                          "COUNT(1) AS qtde, " +
                          "STRING_AGG(e.cd_EsquadriaObra, ', ') AS cdEsquadriaObra," +
                          "(select esquadria.ds_esquadria " +
                          "   from esquadria " +
                          "  where esquadria.id_esquadria = e.id_Esquadria) AS dsEsquadria " +
                     "FROM esquadriaobra e " +
                    "WHERE e.id_obra = :idObra " +
                      "AND e.st_Ativo = true " +
                    "GROUP BY e.id_Obra, " +
                             "e.id_Esquadria, " +
                             "e.ds_Cor, " +
                             "e.tm_Largura, " +
                             "e.tm_Altura " ,
         nativeQuery = true)
    List<Object[]> findAllAgrupado(@Param("idObra") Long idObra);
}
