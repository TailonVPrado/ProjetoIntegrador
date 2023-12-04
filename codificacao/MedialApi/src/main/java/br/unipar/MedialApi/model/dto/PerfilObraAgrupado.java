package br.unipar.MedialApi.model.dto;

import io.swagger.annotations.ApiModel;
import lombok.Data;
import java.math.BigDecimal;
import java.math.BigInteger;

@ApiModel(description = "Classe para tranferencia de dados do objeto PerfilObra")
@Data
public class PerfilObraAgrupado {
    private String  dsPerfil;
    private BigDecimal tmPerfil;
    private Long qtPerfil;
    private String cdEsquadriaObra;
}
