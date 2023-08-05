package br.unipar.MedialApi.repository;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import br.unipar.MedialApi.model.Linha;

import java.util.List;

@Repository
public interface LinhaRepository extends JpaRepository<Linha, Long>{
	//Page<Linha> findAll(Specification<Linha> specification, Pageable pageable);
    @Query("SELECT l FROM Linha l where l.empresa.idEmpresa = :idEmpresa AND UPPER(l.dsLinha) like UPPER(:dsLinha)")
    List<Linha> findByDesc (@Param("idEmpresa") Long idEmpresa, @Param("dsLinha") String dsLinha);
}
