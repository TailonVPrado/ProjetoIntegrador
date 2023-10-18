package br.unipar.MedialApi.repository;

import br.unipar.MedialApi.model.PerfilEsquadria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import br.unipar.MedialApi.model.EsquadriaObra;

@Repository
public interface EsquadriaObraRepository extends JpaRepository<EsquadriaObra, Long>, JpaSpecificationExecutor<EsquadriaObra> {

}
