package br.unipar.MedialApi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.unipar.MedialApi.model.PerfilEsquadria;

@Repository
public interface PerfilEsquadriaRepository extends JpaRepository<PerfilEsquadria, Long>{
}
