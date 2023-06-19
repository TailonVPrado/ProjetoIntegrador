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
@Table(name = "PERFILESQUADRIA")
public class PerfilEsquadria {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_PERFILESQUADRIA")
	private Long idPerfilesquadria;
	
	@Column(name = "QT_PERIL", nullable = false)
	private Integer qtPerfil;
	
	@Column(name = "DS_DESCONTO", length = 50, nullable = false)
	private String dsDesconto;
	
	@Column(name = "ST_ATIVO", nullable = false)
	private boolean stAtivo;

	@CreationTimestamp
	@Column(name = "DT_RECORD", updatable = false, nullable = false)
	private Date dtRecord;

	@UpdateTimestamp
	@Column(name = "DT_ATUALIZACAO", nullable = false)
	private Date dtAtualizacao;
	
	@ManyToOne
	@JoinColumn(name = "ID_ESQUADRIA", nullable = false)
	private Esquadria esquadria;
	
	@ManyToOne
	@JoinColumn(name = "ID_PERFIL", nullable = false)
	private Perfil perfil;	
}