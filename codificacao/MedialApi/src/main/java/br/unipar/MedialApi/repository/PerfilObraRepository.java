package br.unipar.MedialApi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.unipar.MedialApi.model.PerfilObra;

@Repository
public interface PerfilObraRepository extends JpaRepository<PerfilObra, Long>{
	//Page<Perfilobra> findAll(Specification<Perfilobra> specification, Pageable pageable);
}
