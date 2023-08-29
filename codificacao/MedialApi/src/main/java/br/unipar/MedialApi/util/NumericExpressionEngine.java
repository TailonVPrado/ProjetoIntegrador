package br.unipar.MedialApi.util;
import java.math.BigDecimal;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
public class NumericExpressionEngine {
    public static BigDecimal resolve(String expression) throws ScriptException {
        ScriptEngineManager mgr = new ScriptEngineManager();
        ScriptEngine engine = mgr.getEngineByName("JavaScript");
        return new BigDecimal(engine.eval(expression).toString());
    }
}
