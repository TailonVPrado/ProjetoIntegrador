package br.unipar.MedialApi.repository;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import br.unipar.MedialApi.model.Obra;

@Repository
public interface ObraRepository extends JpaRepository<Obra, Long>, JpaSpecificationExecutor<Obra> {
	//Page<Obra> findAll(Specification<Obra> specification, Pageable pageable);
}
