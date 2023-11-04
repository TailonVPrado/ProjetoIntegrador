package br.unipar.MedialApi.util;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
@Slf4j
public class NumericExpressionEngine {
    public static BigDecimal resolve(String expression) throws Exception {
        try{
            try{
                validaCaracteresFormula(expression);
            }catch (Exception ex){
                throw new ScriptException("");
            }
            ScriptEngineManager mgr = new ScriptEngineManager();
            ScriptEngine engine = mgr.getEngineByName("JavaScript");
            return new BigDecimal(engine.eval(expression).toString());
        }catch (NullPointerException ex){
            throw new Exception("Engine para execução de cálculo nao encontrada. Entre em contato com os administradores do sistema.");
        }catch (ScriptException ex){
            throw new Exception("Formula inválida, verifique!");
        }catch (Exception ex){
            log.error("Erro ao executar formula. Erro: "+ex.getMessage());
            throw new Exception("Erro inesperado ao executar cálculo. Entre em contato com os administradores do sistemas.");
        }
    }

    private static void validaCaracteresFormula(String formula)throws Exception{
        try{
            String formulaSimulacao = "";
            String regex = "";
        /*
            Aqui valida se há caracteres diferentes de:
            "+", "-", "*", "/", "(", ")", "AT", "LT"
        */
            formulaSimulacao = formula;
            formulaSimulacao = formulaSimulacao.replaceAll("AT", "");
            formulaSimulacao = formulaSimulacao.replaceAll("LT", "");
            formulaSimulacao = formulaSimulacao.replaceAll(",", ".");
            formulaSimulacao = formulaSimulacao.replaceAll(" ", "");
            regex = "^[0-9()+\\-*/.]*$";
            if(!formulaSimulacao.matches(regex)){
                throw new Exception();
            };

            /* Aqui valida se os pre fixos "AT" e "LT" não estao sem um separador ARITIMETICO entre eles. */
            formulaSimulacao = formula;
            formulaSimulacao = formulaSimulacao.replaceAll("[0-9()]", "");
            if(formulaSimulacao.contains("AT")||formulaSimulacao.contains("LT")){
                regex = "AT\\s*[+\\-*/]\\s*LT";

                Pattern pattern = Pattern.compile(regex);
                Matcher matcher = pattern.matcher(formulaSimulacao);
                if (matcher.find()) {
                    throw new Exception();//retorna erro porque encontrou algum caracter sem separador aritimetico
                }
            }

            /* Aqui valida se os pre fixos "AT" ou "LT" nao foram informados JUNTOS*/
            formulaSimulacao = formula;
            regex = "(AT|LT)(?!\\s*[-+*/])(AT|LT)";
            Pattern pattern = Pattern.compile(regex);
            Matcher matcher = pattern.matcher(formulaSimulacao);
            if (matcher.find()) {
                throw new Exception();//retorna erro porque encontrou algum pre fixo grudado
            }
        }catch (Exception e){
            throw new Exception("Formula inválida, verifique!");
        }
    }
}
