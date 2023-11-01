package br.unipar.MedialApi.model;

import java.sql.Date;


import br.unipar.MedialApi.model.dto.ObraCorteDto;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NamedNativeQuery(name = "Obra.testeTailon",
//public ObraCorteDto(Long idObra, Long idEsquadria, String dsEsquadria, String dsCor, BigDecimal tmAltura, BigDecimal tmLargura, String cdEsquadrias, Integer qtde) {
		query = "select con.id_obra as idObra, " +
				"         con.id_esquadria as idEsquadria, " +
				"         (select ds_esquadria " +
				"            from esquadria e " +
				"           where e.id_esquadria = con.id_esquadria) as dsEsquadria, " +
				"         con.ds_cor as dsCor, " +
				"         con.tm_altura as tmAltura, " +
				"         con.tm_largura as tmLargura, " +
				"         con.cdEsquadrias as cdEsquadrias, " +
				"         con.qtde as qtde " +
				"    from (select e.id_obra, " +
				"          e.id_esquadria, " +
				"          e.ds_cor, " +
				"          e.tm_largura, " +
				"          e.tm_altura, " +
				"          count(1) qtde, " +
				"          string_agg(e.cd_esquadriaobra, ', ') cdEsquadrias " +
				"     from esquadriaobra e " +
				"    where e.id_obra = 29 " +
				"      and e.st_ativo = true " +
				"    group by e.id_obra, " +
				"          e.id_esquadria, " +
				"          e.ds_cor, " +
				"          e.tm_largura, " +
				"          e.tm_altura) con",
		resultSetMapping = "ObraCorteDto")
@SqlResultSetMapping(name = "ObraCorteDto",
					 classes = @ConstructorResult(targetClass = ObraCorteDto.class,
					 columns = {@ColumnResult(name = "idObra"),
						        @ColumnResult(name = "idEsquadria"),
							 	@ColumnResult(name = "dsEsquadria"),
								@ColumnResult(name = "dsCor"),
								@ColumnResult(name = "tmAltura"),
								@ColumnResult(name = "tmLargura"),
							 	@ColumnResult(name = "cdEsquadrias"),
								@ColumnResult(name = "qtde")}))
//public ObraCorteDto(Long idObra, Long idEsquadria, String dsEsquadria, String dsCor, BigDecimal tmAltura, BigDecimal tmLargura, String cdEsquadrias, Integer qtde) {

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