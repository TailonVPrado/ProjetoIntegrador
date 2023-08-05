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

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "PARAMETRO")
public class Parametro {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_PARAMETRO")
	private Long idParametro;
	
	@Column(name = "CD_VERSAO", nullable = false)
	private Long cdVersao;
	
	@Column(name = "NM_PARAMETRO", length = 60, nullable = false)
	private String nmParametro;
	
	@Column(name = "VL_PARAMETRO", length = 100)
	private String vlParametro;
	
	@CreationTimestamp
	@Column(name = "DT_RECORD", updatable = false, nullable = false)	
	private Date dtRecord;

	@UpdateTimestamp
	@Column(name = "DT_ATUALIZACAO")
	private Date dtAtualizacao;
}