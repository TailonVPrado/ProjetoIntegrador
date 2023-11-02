package br.unipar.MedialApi.model.modelQueue;

import br.unipar.MedialApi.model.EsquadriaObra;
import br.unipar.MedialApi.model.enumModel.Operacao;
import lombok.Data;

@Data
public class EsquadriaObraQueue {
    private EsquadriaObra esquadriaObra;
    private Operacao operacao;
}