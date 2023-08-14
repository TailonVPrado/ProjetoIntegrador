package br.unipar.MedialApi.repository;

import br.unipar.MedialApi.model.Linha;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.unipar.MedialApi.model.Perfil;

import java.util.List;

@Repository
public interface PerfilRepository extends JpaRepository<Perfil, Long>{
	//Page<Perfil> findAll(Specification<Perfil> specification, Pageable pageable);

    List<Perfil> findByLinha(Linha linha);
}
