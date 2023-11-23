package br.unipar.MedialApi.config;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class IndexCreator implements ApplicationRunner {
    private final JdbcTemplate jdbcTemplate;

    public IndexCreator(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(ApplicationArguments args) {
        /* Exemplo de nome para ser seguido para criar os indices:
         * tabela_coluna
         * */

        /* SEQUENCIA DE PARAMETROS:
         *
         * { TABELA, COLUNA, NOME_DO_INDICE }
         *
         */
        String[][] indexesToCreate = {
                {"usuario"         , "st_ativo"   , "usuario_stAtivo"},
                {"empresa"         , "st_ativo"   , "empresa_stAtivo"},
                {"linha"           , "st_ativo"   , "linha_stAtivo"},
                {"perfil"          , "st_ativo"   , "perfil_stAtivo"},
                {"esquadria"       , "st_ativo"   , "esquadria_stAtivo"},
                {"perfilesquadria" , "st_ativo"   , "perfilesquadria_stAtivo"},
                {"obra"            , "st_ativo"   , "obra_stAtivo"},
                {"obra"            , "st_impresso", "obra_stImpresso"},
                {"esquadriaobra"   , "st_ativo"   , "esquadriaobra_stAtivo"},
                {"perfilobra"      , "st_ativo"   , "perfilobra_stAtivo"},
                {"esquadriaobra"   , "tm_largura" , "esquadriaobra_tmLargura"},
                {"esquadriaobra"   , "tm_altura"  , "esquadriaobra_tmAltura"},
                {"esquadriaobra"   , "ds_cor"     , "esquadriaobra_dsCor"}
        };

        for (String[] indexInfo : indexesToCreate) {
            String tableName = indexInfo[0];
            String columnName = indexInfo[1];
            String indexName = indexInfo[2];

            // Verificar se o índice já existe
            try{
                String checkIndexSQL = "SELECT indexname FROM pg_indexes WHERE UPPER(tablename) = UPPER(?) AND UPPER(indexname) = UPPER(?)";
                jdbcTemplate.queryForObject(checkIndexSQL, String.class, tableName, indexName);
            }catch (EmptyResultDataAccessException ex){
                //se cair no catch significa que não existe, e entao cria
                String createIndexSQL = "CREATE INDEX " + indexName + " ON " + tableName + " (" + columnName + ")";
                jdbcTemplate.execute(createIndexSQL);
            }
        }
    }
}
