package br.unipar.MedialApi.repository;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.unipar.MedialApi.model.Linha;

@Repository
public interface LinhaRepository extends JpaRepository<Linha, Long>{
	//Page<Linha> findAll(Specification<Linha> specification, Pageable pageable);
}
