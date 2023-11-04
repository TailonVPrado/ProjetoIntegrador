package br.unipar.MedialApi.util;

import br.unipar.MedialApi.exception.FormulaInvalidaException;
import lombok.extern.slf4j.Slf4j;
import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.PolyglotException;
import org.graalvm.polyglot.Value;

import java.math.BigDecimal;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
@Slf4j
public class NumericExpressionEngine {
    public static BigDecimal resolve(String expression) throws Exception {
        try (Context context = Context.create()) {
            try{
                validaCaracteresFormula(expression);
            }catch (Exception ex){
               throw new FormulaInvalidaException();
            }

            Value result = context.eval("js", expression);
            //System.out.println(expression+" = "+result);
            return new BigDecimal(result.toString());
        }catch (NullPointerException ex){
            throw new Exception("Engine para execução de cálculo nao encontrada. Entre em contato com os administradores do sistema.");
        }catch (PolyglotException | FormulaInvalidaException ex){
            throw new Exception("Fórmula inválida, verifique!");
        } catch (Exception ex){
            log.error("Erro ao executar formula. Erro: "+ex.getMessage());
            throw new Exception("Erro inesperado ao executar cálculo. Entre em contato com os administradores do sistemas.");
        }
    }

    private static void validaCaracteresFormula(String formula)throws FormulaInvalidaException{
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
                throw new FormulaInvalidaException();
            };

            /* Aqui valida se os pre fixos "AT" e "LT" não estao sem um separador ARITIMETICO entre eles. */
            formulaSimulacao = formula;
            formulaSimulacao = formulaSimulacao.replaceAll("[0-9()]", "");
            if(formulaSimulacao.contains("AT")||formulaSimulacao.contains("LT")){
                regex = "AT\\s*[+\\-*/]\\s*LT";

                Pattern pattern = Pattern.compile(regex);
                Matcher matcher = pattern.matcher(formulaSimulacao);
                if (matcher.find()) {
                    throw new FormulaInvalidaException();//retorna erro porque encontrou algum caracter sem separador aritimetico
                }
            }

            /* Aqui valida se os pre fixos "AT" ou "LT" nao foram informados JUNTOS*/
            formulaSimulacao = formula;
            regex = "(AT|LT)(?!\\s*[-+*/])(AT|LT)";
            Pattern pattern = Pattern.compile(regex);
            Matcher matcher = pattern.matcher(formulaSimulacao);
            if (matcher.find()) {
                throw new FormulaInvalidaException();//retorna erro porque encontrou algum pre fixo grudado
            }
        }catch (FormulaInvalidaException e){
            throw new FormulaInvalidaException();
        }
    }
}
