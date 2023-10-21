package br.unipar.MedialApi;

import br.unipar.MedialApi.model.Empresa;
import br.unipar.MedialApi.model.Linha;
import br.unipar.MedialApi.service.LinhaService;
import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.assertThrows;

public class LinhaTest {
    private static final Empresa empresa = new Empresa();
    private static final Linha linha = new Linha();
    private final LinhaService linhaService = new LinhaService();

    @BeforeAll
    static void beforeAll() {
        linha.setIdLinha((long) -999);
        linha.setDsLinha("Nome da Linha");

        linha.setEmpresa(empresa);
    }

    @BeforeEach
    void setUp(){
        empresa.setIdEmpresa((long) -999);
        empresa.setNmEmpresa("Empresa para teste unitário");
        linha.setDsLinha("Nome da Linha");
    }

    @Test
    @DisplayName("Teste de validação insert da LINHA para retorno de mensagem caso a descrição dela esteja muito PEQUENA")
    void testeInsertLinhaDescPequena(){
        linha.setDsLinha("");

        Exception exception = assertThrows(Exception.class, () -> {
            linhaService.validaInsert(linha);
        });
        Assertions.assertTrue(exception.getMessage().contains("A descrição da linha deve conter ao menos 3 caracteres."));
    }

    @Test
    @DisplayName("Teste de validação insert da LINHA para retorno de mensagem caso a descrição dela esteja muito GRANDE")
    void testeInsertLinhaDescGrande(){
        linha.setDsLinha("123456789012345678901");
        Exception exception = assertThrows(Exception.class, () -> {
            linhaService.validaInsert(linha);
        });
        Assertions.assertTrue(exception.getMessage().contains("A descrição da linha deve conter no máximo 20 caracteres."));
    }

    @Test
    @DisplayName("Teste de validação insert da LINHA para retorno de mensagem caso a EMPRESA nao seja informada")
    void testeInsertLinhaSemEmpresa(){
        linha.setEmpresa(new Empresa());
        Exception exception = assertThrows(Exception.class, () -> {
            linhaService.validaInsert(linha);
        });
        Assertions.assertTrue(exception.getMessage().contains("Não é possivel inserir uma linha no sistema sem vinculo com uma empresa. Entre em contato com os administradores do sistema."));
    }

    @Test
    @DisplayName("Teste de insert de sucesso")
    void testeInsertSucess(){
        Assertions.assertDoesNotThrow(() -> {
            linhaService.validaInsert(linha);
        });
    }
}
