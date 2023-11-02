package br.unipar.MedialApi.repository;

import br.unipar.MedialApi.model.Linha;
import br.unipar.MedialApi.model.Perfil;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import br.unipar.MedialApi.model.Esquadria;

import java.util.List;

@Repository
public interface EsquadriaRepository extends JpaRepository<Esquadria, Long>, JpaSpecificationExecutor<Esquadria> {
}
