package br.unipar.MedialApi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.unipar.MedialApi.model.EsquadriaObra;

@Repository
public interface EsquadriaObraRepository extends JpaRepository<EsquadriaObra, Long>{
	Page<EsquadriaObra> findAll(Specification<EsquadriaObra> specification, Pageable pageable);
}