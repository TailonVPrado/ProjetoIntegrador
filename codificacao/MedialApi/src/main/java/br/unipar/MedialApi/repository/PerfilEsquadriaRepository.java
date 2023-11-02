package br.unipar.MedialApi.repository;

import br.unipar.MedialApi.model.Esquadria;
import br.unipar.MedialApi.model.PerfilEsquadria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PerfilEsquadriaRepository extends JpaRepository<PerfilEsquadria, Long>, JpaSpecificationExecutor<PerfilEsquadria> {
    List<PerfilEsquadria> findAllByEsquadriaAndStAtivoIsTrue(Esquadria esquadria);
}
