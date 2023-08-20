package br.unipar.MedialApi.repository;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import br.unipar.MedialApi.model.Linha;

import java.util.List;

@Repository
public interface LinhaRepository extends JpaRepository<Linha, Long>, JpaSpecificationExecutor<Linha> {
	//Page<Linha> findAll(Specification<Linha> specification, Pageable pageable);

}
