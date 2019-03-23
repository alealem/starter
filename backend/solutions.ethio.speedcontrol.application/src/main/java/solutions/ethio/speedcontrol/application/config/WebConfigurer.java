package solutions.ethio.speedcontrol.application.config;

import java.util.EnumSet;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import solutions.ethio.speedcontrol.application.config.filter.CachingHttpHeadersFilter;

/**
 * Configuration of web application with Servlet 3.0 APIs.
 */
@Configuration
public class WebConfigurer implements ServletContextInitializer
{

    private final Logger log = LoggerFactory.getLogger(WebConfigurer.class);

    private final Environment env;

    private final ApplicationProperties applicationProperties;

    public WebConfigurer(Environment env, ApplicationProperties applicationProperties)
    {

        this.env = env;
        this.applicationProperties = applicationProperties;
    }

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException
    {
        if (env.getActiveProfiles().length != 0)
        {
            log.info("Web application configuration, using profiles: {}", (Object[]) env.getActiveProfiles());
        }
        EnumSet<DispatcherType> disps = EnumSet.of(DispatcherType.REQUEST, DispatcherType.FORWARD, DispatcherType.ASYNC);
        if (env.acceptsProfiles(ApplicationConstants.SPRING_PROFILE_PRODUCTION))
        {
            initCachingHttpHeadersFilter(servletContext, disps);
        }
        if (env.acceptsProfiles(ApplicationConstants.SPRING_PROFILE_TEST))
        {
            initH2Console(servletContext);
        }
        log.info("Web application fully configured");
    }

    /**
     * Initializes the caching HTTP Headers Filter.
     */
    private void initCachingHttpHeadersFilter(
            ServletContext servletContext,
            EnumSet<DispatcherType> disps)
    {
        log.debug("Registering Caching HTTP Headers Filter");
        FilterRegistration.Dynamic cachingHttpHeadersFilter =
                servletContext.addFilter(
                        "cachingHttpHeadersFilter",
                        new CachingHttpHeadersFilter(applicationProperties));

        cachingHttpHeadersFilter.addMappingForUrlPatterns(disps, true, "/i18n/*");
        cachingHttpHeadersFilter.addMappingForUrlPatterns(disps, true, "/content/*");
        cachingHttpHeadersFilter.addMappingForUrlPatterns(disps, true, "/app/*");
        cachingHttpHeadersFilter.setAsyncSupported(true);
    }

    @Bean
    public CorsFilter corsFilter()
    {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = applicationProperties.getCors();
        if (config.getAllowedOrigins() != null && !config.getAllowedOrigins().isEmpty())
        {
            log.debug("Registering CORS filter");
            source.registerCorsConfiguration("/api/**", config);
            source.registerCorsConfiguration("/management/**", config);
            source.registerCorsConfiguration("/v2/api-docs", config);
        }
        return new CorsFilter(source);
    }

    /**
     * Initializes H2 console.
     */
    private void initH2Console(ServletContext servletContext)
    {
        log.debug("Initialize H2 console");
        H2ConfigurationHelper.initH2Console(servletContext);
    }

}
