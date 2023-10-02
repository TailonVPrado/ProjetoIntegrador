package br.unipar.MedialApi;

import br.unipar.MedialApi.model.Empresa;
import br.unipar.MedialApi.model.Linha;
import br.unipar.MedialApi.model.Perfil;
import br.unipar.MedialApi.service.PerfilService;
import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.assertThrows;

public class PerfilTest {
    private static final Empresa empresa = new Empresa();
    private static final Linha linha = new Linha();
    private static final Perfil perfil = new Perfil();
    private final PerfilService perfilService = new PerfilService();

    @BeforeAll
    static void beforeAll() {
        perfil.setIdPerfil((long) -999);
        perfil.setDsPerfil("Nome do perfil");

        perfil.setEmpresa(empresa);
        perfil.setLinha(linha);
    }

    @BeforeEach
    void setUp(){
        empresa.setIdEmpresa((long) -999);
        empresa.setNmEmpresa("Empresa para teste unitário");

        linha.setIdLinha((long) -999);
        linha.setDsLinha("Nome da Linha");
        linha.setEmpresa(empresa);
    }

    @Test
    @DisplayName("Teste de validação insert do PERFIL para retorno de mensagem caso a descrição dele esteja muito PEQUENA")
    void testeInsertPerfilDescPequena(){
        perfil.setDsPerfil("");

        Exception exception = assertThrows(Exception.class, () -> {
            perfilService.validaInsert(perfil);
        });
        Assertions.assertTrue(exception.getMessage().contains("A descrição do perfil deve conter ao menos 3 caracteres."));
    }

    @Test
    @DisplayName("Teste de validação insert do PERFIL para retorno de mensagem caso a descrição dele esteja muito GRANDE")
    void testeInsertPerfilDescGrande(){
        perfil.setDsPerfil("1234567890123456789012345678901234567890123456789012345678901");
        Exception exception = assertThrows(Exception.class, () -> {
            perfilService.validaInsert(perfil);
        });

        Assertions.assertTrue(exception.getMessage().contains("A descrição do perfil deve conter no máximo 60 caracteres."));
    }

    @Test
    @DisplayName("Teste de validação insert do PERFIL para retorno de mensagem caso a EMPRESA nao seja informada")
    void testeInsertPerfilSemEmpresa(){
        perfil.setEmpresa(new Empresa());
        Exception exception = assertThrows(Exception.class, () -> {
            perfilService.validaInsert(perfil);
        });
        System.out.println(exception);
        Assertions.assertTrue(exception.getMessage().contains("Não é possivel inserir um perfil no sistema sem vinculo com uma empresa. Entre em contato com os administradores do sistema."));
    }

    @Test
    @DisplayName("Teste de validação insert do PERFIL para retorno de mensagem caso a LINHA nao seja informada")
    void testeInsertPerfilSemLinha(){
        perfil.setLinha(new Linha());
        Exception exception = assertThrows(Exception.class, () -> {
            perfilService.validaInsert(perfil);
        });
        System.out.println(exception);
        Assertions.assertTrue(exception.getMessage().contains("Não é possivel inserir um perfil sem vinculo com uma linha. Verifique!"));
    }

}
