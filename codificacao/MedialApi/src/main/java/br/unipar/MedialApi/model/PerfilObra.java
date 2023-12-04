package br.unipar.MedialApi.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@ApiModel(description = "Classe modelo para representar o vinculo de um perfil com uma obra")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "PERFILOBRA")
public class PerfilObra {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_PERFILOBRA")
	private Long idPerfilObra;
	
	@Column(name = "TM_PERFIL", columnDefinition = "numeric(5,1)", nullable = false)
	private Double tmPerfil;
	
	@Column(name = "ST_ATIVO", length = 60, nullable = false)
	private boolean stAtivo;

	@CreationTimestamp
	@Column(name = "DT_RECORD", updatable = false, nullable = false)
	private Date dtRecord;

	@UpdateTimestamp
	@Column(name = "DT_ATUALIZACAO")
	private Date dtAtualizacao;
	
	@ManyToOne
	@JoinColumn(name = "ID_ESQUADRIAOBRA", nullable = false)
	private EsquadriaObra esquadriaobra;
	
	@ManyToOne
	@JoinColumn(name = "ID_PERFILESQUADRIA", nullable = false)
	private PerfilEsquadria perfilesquadria;
}