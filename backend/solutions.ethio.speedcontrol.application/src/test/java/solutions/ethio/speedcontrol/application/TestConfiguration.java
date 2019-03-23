package solutions.ethio.speedcontrol.application;

import java.sql.SQLException;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import solutions.ethio.speedcontrol.application.config.ApplicationConstants;
import solutions.ethio.speedcontrol.application.config.H2ConfigurationHelper;

@Configuration
@EnableJpaRepositories("solutions.ethio.speedcontrol.application.repository")
@EnableJpaAuditing(auditorAwareRef = "springSecurityAuditorAware")
@EnableTransactionManagement
@Slf4j
public class TestConfiguration
{
    private final Environment env;

    public TestConfiguration(Environment env)
    {
        this.env = env;
    }

    /**
     * Open the TCP port for the H2 database, so it is available remotely.
     *
     * @return the H2 database TCP server
     *
     * @throws SQLException
     *         if the server failed to start
     */
    @Bean(initMethod = "start", destroyMethod = "stop")
    @Profile(ApplicationConstants.SPRING_PROFILE_TEST)
    public Object h2TCPServer() throws SQLException
    {
        String port = getValidPortForH2();
        log.debug("H2 database is available on port {}", port);
        return H2ConfigurationHelper.createServer(port);
    }

    private String getValidPortForH2()
    {
        int port = Integer.parseInt(env.getProperty("server.port"));
        if (port < 10000)
        {
            port = 10000 + port;
        }
        else
        {
            if (port < 63536)
            {
                port = port + 2000;
            }
            else
            {
                port = port - 2000;
            }
        }
        return String.valueOf(port);
    }
}
