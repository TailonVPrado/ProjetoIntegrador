package br.unipar.MedialApi.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import io.swagger.annotations.ApiModel;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@ApiModel(description = "Classe modelo para representar uma empresa")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "EMPRESA")
public class Empresa {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_EMPRESA")
	private Long idEmpresa = (long) 0;
	
	@Column(name = "NM_EMPRESA", length = 60, nullable = false)
	private String nmEmpresa;
	
	@Column(name = "ST_ATIVO", nullable = false)
	private boolean stAtivo;

	@CreationTimestamp
	@Column(name= "DT_RECORD", updatable = false, nullable = false)
	private Date dtRecord;

	@UpdateTimestamp
	@Column(name = "DT_ATUALIZACAO")
	private Date dtAtualizacao;
}