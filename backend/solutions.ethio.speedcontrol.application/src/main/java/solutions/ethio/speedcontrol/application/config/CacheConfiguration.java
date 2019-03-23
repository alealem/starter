package solutions.ethio.speedcontrol.application.config;

import java.time.Duration;

import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ExpiryPolicyBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.jsr107.Eh107Configuration;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import solutions.ethio.speedcontrol.application.config.cache.BeanClassLoaderAwareJCacheRegionFactory;
import solutions.ethio.speedcontrol.application.domain.Authority;
import solutions.ethio.speedcontrol.application.domain.User;
import solutions.ethio.speedcontrol.application.repository.UserRepository;

@Configuration
@EnableCaching
public class CacheConfiguration
{

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(ApplicationProperties applicationProperties)
    {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        ApplicationProperties.Cache.Ehcache ehcache =
                applicationProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                        ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                        .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                        .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer()
    {
        return cm ->
        {
            cm.createCache(UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(User.class.getName(), jcacheConfiguration);
            cm.createCache(Authority.class.getName(), jcacheConfiguration);
            cm.createCache(User.class.getName() + ".authorities", jcacheConfiguration);
        };
    }
}
