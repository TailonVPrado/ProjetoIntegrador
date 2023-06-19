package br.unipar.MedialApi.repository;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.unipar.MedialApi.model.Parametro;

@Repository
public interface ParametroRepository extends JpaRepository<Parametro, Long>{
	//Page<Parametro> findAll(Specification<Parametro> specification, Pageable pageable);
}
