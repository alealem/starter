package solutions.ethio.speedcontrol.application.config;

public interface ApplicationConstants
{
    String SPRING_PROFILE_DEVELOPMENT  = "dev";
    String SPRING_PROFILE_TEST         = "test";
    String SPRING_PROFILE_PRODUCTION   = "prod";
    // Spring profile used to disable running liquibase
    String SPRING_PROFILE_NO_LIQUIBASE = "no-liquibase";
}
