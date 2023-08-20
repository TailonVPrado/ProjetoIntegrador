package br.unipar.MedialApi.repository;

import br.unipar.MedialApi.model.Linha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import br.unipar.MedialApi.model.Perfil;

import java.util.List;

@Repository
public interface PerfilRepository extends JpaRepository<Perfil, Long>, JpaSpecificationExecutor<Perfil> {
    List<Perfil> findByLinha(Linha linha);
}
