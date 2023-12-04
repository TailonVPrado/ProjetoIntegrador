package br.unipar.MedialApi;

import br.unipar.MedialApi.model.dto.PerfilDto;
import net.sf.jasperreports.repo.InputStreamResource;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.io.File;
import java.io.InputStream;
import java.net.URI;
import java.net.URL;

@EnableSwagger2
@SpringBootApplication
public class MedialApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(MedialApiApplication.class, args);
	}

	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2)
				.apiInfo(geraInfoSwagger())
				.select()
				.apis(RequestHandlerSelectors.basePackage("br.unipar.MedialApi"))
				.paths(PathSelectors.any())
				.build().
				ignoredParameterTypes(
						File.class,
						InputStream.class,
						InputStreamResource.class,
						URI.class,
						URL.class
				);
	}

	public ApiInfo geraInfoSwagger() {
		return new ApiInfo("Documetação da API da aplicação Medial",
				"",
				"1.0",
				null,
				"Tailon e Larissa",
				null,
				null);
	}
}