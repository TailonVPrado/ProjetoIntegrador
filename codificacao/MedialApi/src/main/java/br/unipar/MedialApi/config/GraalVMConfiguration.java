package br.unipar.MedialApi.config;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class GraalVMConfiguration implements ApplicationRunner {
    /* Essa classe seta a configuraaco do "polyglot.engine.WarnInterpreterOnly" para "false" com o objetivo
     * de evitar com que polua o console com o erro:
     * -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- *
     * [To redirect Truffle log output to a file use one of the following options:
     * * '--log.file=<path>' if the option is passed using a guest language launcher.
     * * '-Dpolyglot.log.file=<path>' if the option is passed using the host Java launcher.
     * * Configure logging using the polyglot embedding API.]
     * [engine] WARNING: The polyglot context is using an implementation that does not support runtime compilation.
     * The guest application code will therefore be executed in interpreted mode only.
     * Execution only in interpreted mode will strongly impact the guest application performance.
     * For more information on using GraalVM see https://www.graalvm.org/java/quickstart/.
     * To disable this warning the '--engine.WarnInterpreterOnly=false' option or use the '-Dpolyglot.engine.WarnInterpreterOnly=false' system property.
     * -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- *
     * pois eram so WARNS que faziam com que o console ficasse poluido e deixava a depuração do código extremamente poluida
     */

    @Override
    public void run(ApplicationArguments args) {
        System.setProperty("polyglot.engine.WarnInterpreterOnly", "false");
    }
}
