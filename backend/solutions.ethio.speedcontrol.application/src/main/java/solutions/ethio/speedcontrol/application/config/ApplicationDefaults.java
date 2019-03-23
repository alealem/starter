package solutions.ethio.speedcontrol.application.config;

public class ApplicationDefaults
{
    interface Async
    {
        int corePoolSize  = 2;
        int maxPoolSize   = 50;
        int queueCapacity = 10000;
    }

    interface Http
    {
        interface Cache
        {

            int timeToLiveInDays = 1461; // 4 years (including leap day)
        }
    }

    interface Cache
    {
        interface Hazelcast
        {
            int timeToLiveSeconds = 3600; // 1 hour
            int backupCount       = 1;

            interface ManagementCenter
            {

                boolean enabled        = false;
                int     updateInterval = 3;
                String  url            = "";
            }
        }

        interface Ehcache
        {

            int  timeToLiveSeconds = 3600; // 1 hour
            long maxEntries        = 100;
        }

        interface Infinispan
        {
            String  configFile   = "default-configs/default-jgroups-tcp.xml";
            boolean statsEnabled = false;

            interface Local
            {

                long timeToLiveSeconds = 60; // 1 minute
                long maxEntries        = 100;
            }

            interface Distributed
            {

                long timeToLiveSeconds = 60; // 1 minute
                long maxEntries        = 100;
                int  instanceCount     = 1;
            }

            interface Replicated
            {

                long timeToLiveSeconds = 60; // 1 minute
                long maxEntries        = 100;
            }
        }

        interface Memcached
        {

            boolean enabled           = false;
            String  servers           = "localhost:11211";
            int     expiration        = 300; // 5 minutes
            boolean useBinaryProtocol = true;
        }
    }

    interface Mail
    {
        boolean enabled = false;
        String  from    = "";
        String  baseUrl = "";
    }

    interface Security
    {

        interface ClientAuthorization
        {

            String accessTokenUri = null;
            String tokenServiceId = null;
            String clientId       = null;
            String clientSecret   = null;
        }

        interface Authentication
        {

            interface Jwt
            {

                String secret                              = null;
                String base64Secret                        = null;
                long   tokenValidityInSeconds              = 1800; // 0.5 hour
                long   tokenValidityInSecondsForRememberMe = 2592000; // 30 hours;
            }
        }

        interface RememberMe
        {

            String key = null;
        }
    }

    interface Registry
    {

        String password = null;
    }
}
