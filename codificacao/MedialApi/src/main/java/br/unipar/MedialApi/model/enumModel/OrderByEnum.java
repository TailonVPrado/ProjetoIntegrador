package br.unipar.MedialApi.model.enumModel;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum OrderByEnum {
    @JsonProperty("asc")
    ASC,
    @JsonProperty("desc")
    DESC
}
