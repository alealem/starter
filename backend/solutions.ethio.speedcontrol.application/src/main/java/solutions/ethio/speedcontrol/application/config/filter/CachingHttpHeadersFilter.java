package solutions.ethio.speedcontrol.application.config.filter;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

import solutions.ethio.speedcontrol.application.config.ApplicationProperties;

public class CachingHttpHeadersFilter implements Filter
{

    public static final int  DEFAULT_DAYS_TO_LIVE    = 1461; // 4 years
    public static final long DEFAULT_SECONDS_TO_LIVE = TimeUnit.DAYS.toMillis(DEFAULT_DAYS_TO_LIVE);

    private long cacheTimeToLive = DEFAULT_SECONDS_TO_LIVE;

    private ApplicationProperties applicationProperties;

    public CachingHttpHeadersFilter(ApplicationProperties applicationProperties)
    {
        this.applicationProperties = applicationProperties;
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException
    {
        cacheTimeToLive = TimeUnit.DAYS.toMillis(applicationProperties.getHttp().getCache().getTimeToLiveInDays());
    }

    @Override
    public void destroy()
    {
        // Nothing to destroy
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException
    {

        HttpServletResponse httpResponse = (HttpServletResponse) response;

        httpResponse.setHeader("Cache-Control", "max-age=" + cacheTimeToLive + ", public");
        httpResponse.setHeader("Pragma", "cache");

        // Setting Expires header, for proxy caching
        httpResponse.setDateHeader("Expires", cacheTimeToLive + System.currentTimeMillis());

        chain.doFilter(request, response);
    }
}