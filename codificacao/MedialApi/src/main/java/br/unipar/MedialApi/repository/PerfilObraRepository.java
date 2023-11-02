package br.unipar.MedialApi.repository;

import br.unipar.MedialApi.model.EsquadriaObra;
import br.unipar.MedialApi.model.PerfilObra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PerfilObraRepository extends JpaRepository<PerfilObra, Long>{
    List<PerfilObra> findAllByEsquadriaobra(EsquadriaObra esquadriaObra);
}
