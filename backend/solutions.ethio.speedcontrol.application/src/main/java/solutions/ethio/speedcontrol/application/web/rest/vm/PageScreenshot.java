package solutions.ethio.speedcontrol.application.web.rest.vm;

import java.time.Instant;
import java.util.Set;

import lombok.Value;

@Value
public class PageScreenshot
{
    Long      id;
    Long      bankId;
    Long      screenshotId;
    String    screenshotPath;
    String    pageUrl;
    Instant   createdAt;
    Set<Link> linksOnPage;

    @Value
    public static class Link
    {
        Long   id;
        String url;
        String linkText;
    }
}
