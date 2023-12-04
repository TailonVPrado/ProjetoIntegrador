package br.unipar.MedialApi.model.dto;

import br.unipar.MedialApi.model.Esquadria;
import io.swagger.annotations.ApiModel;
import lombok.Data;

@ApiModel(description = "Classe para tranferencia de dados do objeto PerfilEsquadria")
@Data
public class PerfilEsquadriaDto {

    private Long idPerfilEsquadria;
    private Integer qtPerfil;
    private String dsDesconto;
    private Esquadria esquadria;
    private PerfilDto perfil;
}
