package br.unipar.MedialApi.model;

import java.sql.Date;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "OBRA")
public class Obra {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_OBRA")
	private Long idObra;
	
	@Column(name = "DS_OBRA", length = 60, nullable = false)
	private String dsObra;
	
	@Column(name = "NR_VERSAO", nullable = false)
	private Integer nrVersao;
	
	@Column(name = "ST_IMPRESSO")
	private boolean stImpresso;
	
	@Column(name = "DT_LANCAMENTO", nullable = false)
	private Date dtLancamento;
	
	@Column(name = "ST_ATIVO", length = 60, nullable = false)
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