package br.unipar.MedialApi.exception;

public class EmpresaIndefinidaException extends Exception{
    public EmpresaIndefinidaException(){
        super("Ocorreu um erro ao realizar a operação. Erro: Empresa indefinida.");
    }
}
