package br.unipar.MedialApi.model.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ObraCorteDto {
    private Long idObra;
    private Long idEsquadria;
    private String  dsEsquadria;
    private String dsCor;
    private BigDecimal tmLargura;
    private BigDecimal tmAltura;
    private Long qtde;
    private String cdEsquadriaObra;
}
