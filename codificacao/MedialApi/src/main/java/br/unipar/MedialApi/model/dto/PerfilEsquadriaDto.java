package br.unipar.MedialApi.model.dto;

import br.unipar.MedialApi.model.Esquadria;
import lombok.Data;

@Data
public class PerfilEsquadriaDto {

    private Long idPerfilEsquadria;
    private Integer qtPerfil;
    private String dsDesconto;
    private Esquadria esquadria;
    private PerfilDto perfil;
}
