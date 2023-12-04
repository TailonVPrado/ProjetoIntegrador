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

@ApiModel(description = "Classe modelo para representar um usuário")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "USUARIO")
public class Usuario {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_USUARIO")
	private Long idUsuario;
	
	@Column(name = "NM_USUARIO", length = 60, nullable = false)
	private String nmUsuario;
	
	@Column(name = "CD_LOGIN", length = 20, nullable = false)
	private String cdLogin;
	
	@Column(name = "SN_LOGIN", length = 20, nullable = false)
	private String snLogin;
	
	@Column(name = "ST_ATIVO", nullable = false)
	private boolean stAtivo;

	@CreationTimestamp
	@Column(name = "DT_RECORD", updatable = false, nullable = false)
	private Date dtRecord;

	@UpdateTimestamp
	@Column(name = "DT_ATUALIZACAO")
	private Date dtAtualizacao;
	
	@ManyToOne
	@JoinColumn(name = "ID_EMPRESA", nullable = false)
	private Empresa empresa;	
}