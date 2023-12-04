package br.unipar.MedialApi.model.dto;

import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.math.BigDecimal;
@ApiModel(description = "Classe para tranferencia de dados do objeto EsquadriaObra")
@Data
public class EsquadriaObraAgrupadaDto {
    private Long idObra;
    private Long idEsquadria;
    private String  dsEsquadria;
    private String dsCor;
    private BigDecimal tmLargura;
    private BigDecimal tmAltura;
    private Long qtde;
    private String cdEsquadriaObra;
    private String dsLinha;
}
