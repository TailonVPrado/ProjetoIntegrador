package br.unipar.MedialApi.model.modelQueue;

import br.unipar.MedialApi.model.EsquadriaObra;
import br.unipar.MedialApi.model.enumModel.OperacaoEnum;
import lombok.Data;

@Data
public class EsquadriaObraQueue {
    private EsquadriaObra esquadriaObra;
    private OperacaoEnum operacao;
}