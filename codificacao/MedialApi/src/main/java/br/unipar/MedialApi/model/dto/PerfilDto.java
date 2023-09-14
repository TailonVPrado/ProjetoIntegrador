package br.unipar.MedialApi.model.dto;

import br.unipar.MedialApi.model.Empresa;
import br.unipar.MedialApi.model.Linha;
import lombok.Data;

@Data
public class PerfilDto {

    private Long idPerfil;
    private String dsPerfil;
    private Empresa empresa;
    private Linha linha;
    private boolean stNotContemImg;
}
