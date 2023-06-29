package br.unipar.MedialApi.exception;

import lombok.Data;

import java.util.Arrays;
import java.util.List;

@Data
public class ApiErrorMessage {

    private List<String> errors;

    public ApiErrorMessage(List<String> errors) {
        this.errors = errors;
    }

    public ApiErrorMessage(String error) {
        this.errors = Arrays.asList(error);
    }

    public List<String> getErrors() {
        return errors;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }

}