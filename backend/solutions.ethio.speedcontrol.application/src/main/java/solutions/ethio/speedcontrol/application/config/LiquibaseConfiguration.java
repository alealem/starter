package solutions.ethio.speedcontrol.application.config;

//@Configuration
public class LiquibaseConfiguration
{

/*    private final Logger log = LoggerFactory.getLogger(LiquibaseConfiguration.class);

    private final Environment env;

    private final CacheManager cacheManager;

    public LiquibaseConfiguration(Environment env, CacheManager cacheManager)
    {
        this.env = env;
        this.cacheManager = cacheManager;
    }

    @Bean
    public SpringLiquibase liquibase(
            @Qualifier("taskExecutor") TaskExecutor taskExecutor,
            DataSource dataSource, LiquibaseProperties liquibaseProperties)
    {

        // Use liquibase.integration.spring.SpringLiquibase if you don't want Liquibase to start asynchronously
        SpringLiquibase liquibase = new AsyncSpringLiquibase(taskExecutor, env);
        liquibase.setDataSource(dataSource);
        liquibase.setChangeLog("classpath:config/liquibase/master.xml");
        liquibase.setContexts(liquibaseProperties.getContexts());
        liquibase.setDefaultSchema(liquibaseProperties.getDefaultSchema());
        liquibase.setDropFirst(liquibaseProperties.isDropFirst());
        liquibase.setChangeLogParameters(liquibaseProperties.getParameters());
        if (env.acceptsProfiles(ApplicationConstants.SPRING_PROFILE_NO_LIQUIBASE))
        {
            liquibase.setShouldRun(false);
        }
        else
        {
            liquibase.setShouldRun(liquibaseProperties.isEnabled());
            log.debug("Configuring Liquibase");
        }
        return liquibase;
    }*/
}
