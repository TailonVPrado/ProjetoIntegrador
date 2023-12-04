package br.unipar.MedialApi.model.dto;

import br.unipar.MedialApi.model.Empresa;
import br.unipar.MedialApi.model.Linha;
import io.swagger.annotations.ApiModel;
import lombok.Data;

@ApiModel(description = "Classe para tranferencia de dados do objeto Perfil")
@Data
public class PerfilDto {

    private Long idPerfil;
    private String dsPerfil;
    private Empresa empresa;
    private Linha linha;
    private boolean stNotContemImg;
}
