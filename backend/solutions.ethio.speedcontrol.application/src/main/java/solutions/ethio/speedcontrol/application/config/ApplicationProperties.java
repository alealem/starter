package solutions.ethio.speedcontrol.application.config;

import javax.validation.constraints.NotNull;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.web.cors.CorsConfiguration;

@ConfigurationProperties(prefix = "application", ignoreUnknownFields = true)
public class ApplicationProperties
{
    private final Async async = new Async();

    private final Http http = new Http();

    private final Cache cache = new Cache();

    private final CorsConfiguration cors = new CorsConfiguration();

    private final Security security = new Security();

    private final Mail mail = new Mail();

    public Async getAsync()
    {
        return async;
    }

    public Http getHttp()
    {
        return http;
    }

    public Cache getCache()
    {
        return cache;
    }

    public CorsConfiguration getCors()
    {
        return cors;
    }

    public Security getSecurity()
    {
        return security;
    }

    public Mail getMail()
    {
        return mail;
    }

    public static class Async
    {

        private int corePoolSize = ApplicationDefaults.Async.corePoolSize;

        private int maxPoolSize = ApplicationDefaults.Async.maxPoolSize;

        private int queueCapacity = ApplicationDefaults.Async.queueCapacity;

        public int getCorePoolSize()
        {
            return corePoolSize;
        }

        public void setCorePoolSize(int corePoolSize)
        {
            this.corePoolSize = corePoolSize;
        }

        public int getMaxPoolSize()
        {
            return maxPoolSize;
        }

        public void setMaxPoolSize(int maxPoolSize)
        {
            this.maxPoolSize = maxPoolSize;
        }

        public int getQueueCapacity()
        {
            return queueCapacity;
        }

        public void setQueueCapacity(int queueCapacity)
        {
            this.queueCapacity = queueCapacity;
        }
    }

    public static class Cache
    {

        private final Hazelcast hazelcast = new Hazelcast();

        private final Ehcache ehcache = new Ehcache();

        private final Infinispan infinispan = new Infinispan();

        private final Memcached memcached = new Memcached();

        public Hazelcast getHazelcast()
        {
            return hazelcast;
        }

        public Ehcache getEhcache()
        {
            return ehcache;
        }

        public Infinispan getInfinispan()
        {
            return infinispan;
        }

        public Memcached getMemcached()
        {
            return memcached;
        }

        public static class Hazelcast
        {

            private int timeToLiveSeconds = ApplicationDefaults.Cache.Hazelcast.timeToLiveSeconds;

            private int backupCount = ApplicationDefaults.Cache.Hazelcast.backupCount;

            private final ManagementCenter managementCenter = new ManagementCenter();

            public ManagementCenter getManagementCenter()
            {
                return managementCenter;
            }

            public static class ManagementCenter
            {

                private boolean enabled = ApplicationDefaults.Cache.Hazelcast.ManagementCenter.enabled;

                private int updateInterval = ApplicationDefaults.Cache.Hazelcast.ManagementCenter.updateInterval;

                private String url = ApplicationDefaults.Cache.Hazelcast.ManagementCenter.url;

                public boolean isEnabled()
                {
                    return enabled;
                }

                public void setEnabled(boolean enabled)
                {
                    this.enabled = enabled;
                }

                public int getUpdateInterval()
                {
                    return updateInterval;
                }

                public void setUpdateInterval(int updateInterval)
                {
                    this.updateInterval = updateInterval;
                }

                public String getUrl()
                {
                    return url;
                }

                public void setUrl(String url)
                {
                    this.url = url;
                }

            }

            public int getTimeToLiveSeconds()
            {
                return timeToLiveSeconds;
            }

            public void setTimeToLiveSeconds(int timeToLiveSeconds)
            {
                this.timeToLiveSeconds = timeToLiveSeconds;
            }

            public int getBackupCount()
            {
                return backupCount;
            }

            public void setBackupCount(int backupCount)
            {
                this.backupCount = backupCount;
            }
        }

        public static class Ehcache
        {

            private int timeToLiveSeconds = ApplicationDefaults.Cache.Ehcache.timeToLiveSeconds;

            private long maxEntries = ApplicationDefaults.Cache.Ehcache.maxEntries;

            public int getTimeToLiveSeconds()
            {
                return timeToLiveSeconds;
            }

            public void setTimeToLiveSeconds(int timeToLiveSeconds)
            {
                this.timeToLiveSeconds = timeToLiveSeconds;
            }

            public long getMaxEntries()
            {
                return maxEntries;
            }

            public void setMaxEntries(long maxEntries)
            {
                this.maxEntries = maxEntries;
            }
        }

        public static class Infinispan
        {

            private String configFile = ApplicationDefaults.Cache.Infinispan.configFile;

            private boolean statsEnabled = ApplicationDefaults.Cache.Infinispan.statsEnabled;

            private final Local local = new Local();

            private final Distributed distributed = new Distributed();

            private final Replicated replicated = new Replicated();

            public String getConfigFile()
            {
                return configFile;
            }

            public void setConfigFile(String configFile)
            {
                this.configFile = configFile;
            }

            public boolean isStatsEnabled()
            {
                return statsEnabled;
            }

            public void setStatsEnabled(boolean statsEnabled)
            {
                this.statsEnabled = statsEnabled;
            }

            public Local getLocal()
            {
                return local;
            }

            public Distributed getDistributed()
            {
                return distributed;
            }

            public Replicated getReplicated()
            {
                return replicated;
            }

            public static class Local
            {

                private long timeToLiveSeconds = ApplicationDefaults.Cache.Infinispan.Local.timeToLiveSeconds;

                private long maxEntries = ApplicationDefaults.Cache.Infinispan.Local.maxEntries;

                public long getTimeToLiveSeconds()
                {
                    return timeToLiveSeconds;
                }

                public void setTimeToLiveSeconds(long timeToLiveSeconds)
                {
                    this.timeToLiveSeconds = timeToLiveSeconds;
                }

                public long getMaxEntries()
                {
                    return maxEntries;
                }

                public void setMaxEntries(long maxEntries)
                {
                    this.maxEntries = maxEntries;
                }

            }

            public static class Distributed
            {

                private long timeToLiveSeconds = ApplicationDefaults.Cache.Infinispan.Distributed.timeToLiveSeconds;

                private long maxEntries = ApplicationDefaults.Cache.Infinispan.Distributed.maxEntries;

                private int instanceCount = ApplicationDefaults.Cache.Infinispan.Distributed.instanceCount;

                public long getTimeToLiveSeconds()
                {
                    return timeToLiveSeconds;
                }

                public void setTimeToLiveSeconds(long timeToLiveSeconds)
                {
                    this.timeToLiveSeconds = timeToLiveSeconds;
                }

                public long getMaxEntries()
                {
                    return maxEntries;
                }

                public void setMaxEntries(long maxEntries)
                {
                    this.maxEntries = maxEntries;
                }

                public int getInstanceCount()
                {
                    return instanceCount;
                }

                public void setInstanceCount(int instanceCount)
                {
                    this.instanceCount = instanceCount;
                }
            }

            public static class Replicated
            {

                private long timeToLiveSeconds = ApplicationDefaults.Cache.Infinispan.Replicated.timeToLiveSeconds;

                private long maxEntries = ApplicationDefaults.Cache.Infinispan.Replicated.maxEntries;

                public long getTimeToLiveSeconds()
                {
                    return timeToLiveSeconds;
                }

                public void setTimeToLiveSeconds(long timeToLiveSeconds)
                {
                    this.timeToLiveSeconds = timeToLiveSeconds;
                }

                public long getMaxEntries()
                {
                    return maxEntries;
                }

                public void setMaxEntries(long maxEntries)
                {
                    this.maxEntries = maxEntries;
                }

            }
        }

        public static class Memcached
        {

            private boolean enabled = ApplicationDefaults.Cache.Memcached.enabled;

            /**
             * Comma or whitespace separated list of servers' addresses.
             */
            private String servers = ApplicationDefaults.Cache.Memcached.servers;

            private int expiration = ApplicationDefaults.Cache.Memcached.expiration;

            private boolean useBinaryProtocol = ApplicationDefaults.Cache.Memcached.useBinaryProtocol;

            public boolean isEnabled()
            {
                return enabled;
            }

            public void setEnabled(boolean enabled)
            {
                this.enabled = enabled;
            }

            public String getServers()
            {
                return servers;
            }

            public void setServers(String servers)
            {
                this.servers = servers;
            }

            public int getExpiration()
            {
                return expiration;
            }

            public void setExpiration(int expiration)
            {
                this.expiration = expiration;
            }

            public boolean isUseBinaryProtocol()
            {
                return useBinaryProtocol;
            }

            public void setUseBinaryProtocol(boolean useBinaryProtocol)
            {
                this.useBinaryProtocol = useBinaryProtocol;
            }
        }
    }

    public static class Http
    {

        private final Cache cache = new Cache();

        public Cache getCache()
        {
            return cache;
        }

        public static class Cache
        {

            private int timeToLiveInDays = ApplicationDefaults.Http.Cache.timeToLiveInDays;

            public int getTimeToLiveInDays()
            {
                return timeToLiveInDays;
            }

            public void setTimeToLiveInDays(int timeToLiveInDays)
            {
                this.timeToLiveInDays = timeToLiveInDays;
            }
        }
    }

    public static class Security
    {
        private final ClientAuthorization clientAuthorization = new ClientAuthorization();

        private final Authentication authentication = new Authentication();

        private final RememberMe rememberMe = new RememberMe();

        public ClientAuthorization getClientAuthorization()
        {
            return clientAuthorization;
        }

        public Authentication getAuthentication()
        {
            return authentication;
        }

        public RememberMe getRememberMe()
        {
            return rememberMe;
        }

        public static class ClientAuthorization
        {

            private String accessTokenUri = ApplicationDefaults.Security.ClientAuthorization.accessTokenUri;

            private String tokenServiceId = ApplicationDefaults.Security.ClientAuthorization.tokenServiceId;

            private String clientId = ApplicationDefaults.Security.ClientAuthorization.clientId;

            private String clientSecret = ApplicationDefaults.Security.ClientAuthorization.clientSecret;

            public String getAccessTokenUri()
            {
                return accessTokenUri;
            }

            public void setAccessTokenUri(String accessTokenUri)
            {
                this.accessTokenUri = accessTokenUri;
            }

            public String getTokenServiceId()
            {
                return tokenServiceId;
            }

            public void setTokenServiceId(String tokenServiceId)
            {
                this.tokenServiceId = tokenServiceId;
            }

            public String getClientId()
            {
                return clientId;
            }

            public void setClientId(String clientId)
            {
                this.clientId = clientId;
            }

            public String getClientSecret()
            {
                return clientSecret;
            }

            public void setClientSecret(String clientSecret)
            {
                this.clientSecret = clientSecret;
            }
        }

        public static class Authentication
        {

            private final Jwt jwt = new Jwt();

            public Jwt getJwt()
            {
                return jwt;
            }

            public static class Jwt
            {
                private String secret = ApplicationDefaults.Security.Authentication.Jwt.secret;

                private String base64Secret = ApplicationDefaults.Security.Authentication.Jwt.base64Secret;

                private long tokenValidityInSeconds = ApplicationDefaults.Security.Authentication.Jwt
                        .tokenValidityInSeconds;

                private long tokenValidityInSecondsForRememberMe = ApplicationDefaults.Security.Authentication.Jwt
                        .tokenValidityInSecondsForRememberMe;

                public String getSecret()
                {
                    return secret;
                }

                public void setSecret(String secret)
                {
                    this.secret = secret;
                }

                public String getBase64Secret()
                {
                    return base64Secret;
                }

                public void setBase64Secret(String base64Secret)
                {
                    this.base64Secret = base64Secret;
                }

                public long getTokenValidityInSeconds()
                {
                    return tokenValidityInSeconds;
                }

                public void setTokenValidityInSeconds(long tokenValidityInSeconds)
                {
                    this.tokenValidityInSeconds = tokenValidityInSeconds;
                }

                public long getTokenValidityInSecondsForRememberMe()
                {
                    return tokenValidityInSecondsForRememberMe;
                }

                public void setTokenValidityInSecondsForRememberMe(long tokenValidityInSecondsForRememberMe)
                {
                    this.tokenValidityInSecondsForRememberMe = tokenValidityInSecondsForRememberMe;
                }
            }
        }

        public static class RememberMe
        {

            @NotNull
            private String key = ApplicationDefaults.Security.RememberMe.key;

            public String getKey()
            {
                return key;
            }

            public void setKey(String key)
            {
                this.key = key;
            }
        }
    }

    public static class Mail
    {

        private boolean enabled = ApplicationDefaults.Mail.enabled;

        private String from = ApplicationDefaults.Mail.from;

        private String baseUrl = ApplicationDefaults.Mail.baseUrl;

        public boolean isEnabled()
        {
            return enabled;
        }

        public void setEnabled(boolean enabled)
        {
            this.enabled = enabled;
        }

        public String getFrom()
        {
            return from;
        }

        public void setFrom(String from)
        {
            this.from = from;
        }

        public String getBaseUrl()
        {
            return baseUrl;
        }

        public void setBaseUrl(String baseUrl)
        {
            this.baseUrl = baseUrl;
        }
    }
}