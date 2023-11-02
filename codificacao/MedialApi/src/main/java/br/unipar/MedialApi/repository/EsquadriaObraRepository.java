package br.unipar.MedialApi.repository;

import br.unipar.MedialApi.model.Obra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.unipar.MedialApi.model.EsquadriaObra;

import java.util.List;

@Repository
public interface EsquadriaObraRepository extends JpaRepository<EsquadriaObra, Long>, JpaSpecificationExecutor<EsquadriaObra> {
    @Query(value = "SELECT idObra,\n" +
                    "      idEsquadria,\n" +
                    "      dsCor,\n" +
                    "      tmLargura,\n" +
                    "      tmAltura,\n" +
                    "      qtde,\n" +
                    "      cdEsquadriaObra,\n" +
                    "      dsEsquadria\n" +
                    " FROM(SELECT e.id_Obra as idObra,\n" +
                    "             e.id_Esquadria as idEsquadria,\n" +
                    "             e.ds_Cor as dsCor,\n" +
                    "             e.tm_Largura as tmLargura,\n" +
                    "             e.tm_Altura as tmAltura,\n" +
                    "             COUNT(1) as qtde,\n" +
                    "             STRING_AGG(e.cd_EsquadriaObra, ', ') as cdEsquadriaObra,\n" +
                    "             (select esquadria.ds_esquadria\n" +
                    "                 from esquadria\n" +
                    "               where esquadria.id_esquadria = e.id_Esquadria) as dsEsquadria\n" +
                    "           FROM esquadriaobra e\n" +
                    "           WHERE e.id_obra = :idObra\n" +
                    "           AND e.st_Ativo = true\n" +
                    "           GROUP BY e.id_Obra,\n" +
                    "                 e.id_Esquadria,\n" +
                    "                 e.ds_Cor,\n" +
                    "                 e.tm_Largura,\n" +
                    "                 e.tm_Altura) consulta\n" +
                    " ORDER BY dsEsquadria asc, qtde desc" ,
         nativeQuery = true)
    List<Object[]> findAllAgrupado(@Param("idObra") Long idObra);

    List<EsquadriaObra> findAllByObraAndStAtivoIsTrue(Obra obra);

    @Query(value = "SELECT ESQUADRIAOBRA.ID_ESQUADRIAOBRA\n" +
                   "  FROM ESQUADRIAOBRA,\n" +
                   "  \t   ESQUADRIA,\n" +
                   "  \t   PERFILESQUADRIA,\n" +
                   "  \t   OBRA\n" +
                   " WHERE ESQUADRIA.ID_ESQUADRIA = ESQUADRIAOBRA .ID_ESQUADRIA\n" +
                   "   AND ESQUADRIAOBRA.ID_OBRA = OBRA.ID_OBRA\n" +
                   "   AND PERFILESQUADRIA.ID_ESQUADRIA = ESQUADRIA.ID_ESQUADRIA\n" +
                   "   AND NOT OBRA.ST_IMPRESSO\n" +
                   "   AND PERFILESQUADRIA.ID_PERFILESQUADRIA = :idPerfilEsquadria",
        nativeQuery = true)
    Long[] findAllEsquadriaObraContemPerfil(@Param("idPerfilEsquadria") Long idPerfilEsquadria);
}
