package br.unipar.MedialApi.model.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.math.BigInteger;

@Data
public class PerfilObraAgrupado {
    private String  dsPerfil;
    private BigDecimal tmPerfil;
    private Long qtPerfil;
    private String cdEsquadriaObra;
}
