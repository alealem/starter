package solutions.ethio.speedcontrol.application.config.cache;

import java.util.Properties;

import javax.cache.Cache;

import org.hibernate.cache.jcache.JCacheRegionFactory;
import org.hibernate.cache.spi.*;

public class NoDefaultJCacheRegionFactory extends JCacheRegionFactory
{

    public static final String EXCEPTION_MESSAGE = "All Hibernate caches should be created upfront. " +
            "Please update CacheConfiguration.java to add";

    @Override
    protected Cache<Object, Object> createCache(
            String regionName, Properties properties, CacheDataDescription
            metadata)
    {
        throw new IllegalStateException(EXCEPTION_MESSAGE + " " + regionName);
    }
}
