package br.unipar.MedialApi.model.enumModel;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum CorEnum {
    @JsonProperty("Vazio")
    VAZIO,
    @JsonProperty("Preto")
    PRETO,
    @JsonProperty("Branco")
    BRANCO,
    @JsonProperty("Bronze")
    BRONZE,
    @JsonProperty("Amadeirado")
    AMADEIRADO,
    @JsonProperty("Marrom")
    MARROM,

    @JsonProperty("Prata")
    PRATA,
    @JsonProperty("Cinza")
    CINZA
}
