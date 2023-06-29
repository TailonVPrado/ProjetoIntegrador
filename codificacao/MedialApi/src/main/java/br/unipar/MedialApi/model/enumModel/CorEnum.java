package br.unipar.MedialApi.model.enumModel;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum CorEnum {
    @JsonProperty("Preto")
    PRETO,
    @JsonProperty("Branco")
    BRANCO,
    @JsonProperty("Amadeirado")
    AMADEIRADO,
    @JsonProperty("Marrom")
    MARROM,

    @JsonProperty("Prata")
    PRATA,
    @JsonProperty("Cinza")
    CINZA,
    @JsonProperty("Beonze")
    BRONZE
}