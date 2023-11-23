package br.unipar.MedialApi.repository;

import br.unipar.MedialApi.model.EsquadriaObra;
import br.unipar.MedialApi.model.PerfilObra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PerfilObraRepository extends JpaRepository<PerfilObra, Long>{
    List<PerfilObra> findAllByEsquadriaobra(EsquadriaObra esquadriaObra);

    @Query(value = "SELECT con.ds_perfil as dsPerfil, \n" +
            "              con.tm_perfil as tmPerfil, \n" +
            "              SUM(con.qt_perfil) as qtPerfil, \n" +
            "              STRING_AGG(con.cd_esquadriaobra_list, ', ') as cdEsquadriaObra \n" +
            "         FROM (SELECT po.tm_perfil, \n" +
            "                      COUNT(1)*pe.qt_perfil AS qt_perfil, \n" +
            "                      eo.cd_esquadriaobra || ' (' ||  COUNT(1)*pe.qt_perfil  ||'x)' AS cd_esquadriaobra_list, \n" +
            "                      p.ds_perfil \n" +
            "                 FROM esquadriaobra eo, \n" +
            "                       perfilobra po, \n" +
            "                       perfilesquadria pe, \n" +
            "                       perfil p, \n" +
            "                       esquadria e  \n" +
            "                 WHERE eo.id_esquadriaobra = po.id_esquadriaobra  \n" +
            "                   AND po.id_perfilesquadria = pe.id_perfilesquadria  \n" +
            "                   AND pe.id_perfil = p.id_perfil \n" +
            "                   AND eo.id_esquadria = e.id_esquadria \n" +
            "                   AND pe.id_esquadria = e.id_esquadria \n" +
            "                   AND e.st_ativo \n" +
            "                   AND eo.st_ativo \n" +
            "                   AND po.st_ativo \n" +
            "                   AND pe.st_ativo \n" +
            "                   AND p.st_ativo \n" +
            "                   AND eo.id_esquadria = :idEsquadria  \n" +
            "                   AND eo.id_obra = :idObra \n" +
            "                   AND eo.ds_cor = :dsCor \n" +
            "                   AND eo.tm_largura = :tmLargura \n" +
            "                   AND eo.tm_altura = :tmAltura \n" +
            "                 GROUP BY po.tm_perfil, \n" +
            "                       pe.qt_perfil, \n" +
            "                       eo.cd_esquadriaobra, \n" +
            "                       p.ds_perfil) AS con \n" +
            "        GROUP BY con.tm_perfil, \n" +
            "                 con.ds_perfil \n" +
            "        order by con.ds_perfil asc,\n" +
            "    \t           con.tm_perfil desc",
            nativeQuery = true)
    List<Object[]> findPerfilObraAgrupado(@Param("idEsquadria") Long idEsquadria,
                                          @Param("idObra") Long idObra,
                                          @Param("dsCor") String dsCor,
                                          @Param("tmLargura") Long tmLargura,
                                          @Param("tmAltura") Long tmAltura);
}
