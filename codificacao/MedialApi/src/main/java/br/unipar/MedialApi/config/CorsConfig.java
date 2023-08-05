package br.unipar.MedialApi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration config = new CorsConfiguration();

        // Permitir todas as origens (cuidado em produção - é recomendado restringir as origens permitidas)
        config.addAllowedOrigin("*");

        // Permitir todos os métodos HTTP (GET, POST, PUT, DELETE, etc.)
        config.addAllowedMethod("*");

        // Permitir headers específicos (pode adicionar mais headers conforme necessário)
        config.addAllowedHeader("Origin");
        config.addAllowedHeader("Content-Type");
        config.addAllowedHeader("Accept");
        //config.addAllowedHeader("Authorization"); // Caso você use autenticação


        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}