package br.unipar.MedialApi.repository;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.unipar.MedialApi.model.Perfil;

@Repository
public interface PerfilRepository extends JpaRepository<Perfil, Long>{
	//Page<Perfil> findAll(Specification<Perfil> specification, Pageable pageable);
}
