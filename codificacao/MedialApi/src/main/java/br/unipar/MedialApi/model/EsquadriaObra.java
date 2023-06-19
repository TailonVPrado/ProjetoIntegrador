package br.unipar.MedialApi.model;

import java.math.BigDecimal;
import java.sql.Date;

import javax.persistence.*;

import br.unipar.MedialApi.model.enumModel.CorEnum;
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
@Table(name = "ESQUADRIAOBRA")
public class EsquadriaObra {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_ESQUADRIAOBRA")
	private Long idEsquadriaobra;
	
	@Column(name = "CD_ESQUADRIAOBRA", length = 5, nullable = false)
	private String cdEsquadriaobra;
	
	@Column(name = "TM_LARGURA", columnDefinition = "numeric(5,1)", nullable = false)
	private BigDecimal  tmLargura;
	
	@Column(name = "TM_ALTURA", columnDefinition = "numeric(5,1)", nullable = false)
	private BigDecimal tmAltura;
	
	@Column(name = "ST_ATIVO", nullable = false)
	private boolean stAtivo;

	@CreationTimestamp
	@Column(name = "DT_RECORD", updatable = false, nullable = false)
	private Date dtRecord;

	@UpdateTimestamp
	@Column(name = "DT_ATUALIZACAO", nullable = false)
	private Date dtAtualizacao;

	@Column(name = "DS_COR", length = 20)
	@Enumerated(EnumType.STRING)
	private CorEnum corEnum;
	
	@ManyToOne
	@JoinColumn(name = "ID_OBRA", nullable = false)
	private Obra obra;
	
	@ManyToOne
	@JoinColumn(name = "ID_ESQUADRIA", nullable = false)
	private Esquadria esquadria;
}