package br.unipar.MedialApi.model.modelQueue;

import lombok.Data;

@Data
public class EmailQueue {
    private String remetente;
    private String[] destinatario;
    private String assunto;
    private String corpo;
}
