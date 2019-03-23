package solutions.ethio.speedcontrol.application.validators;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

@Component
public class EmailAddressValidator
{
    private Pattern pattern;
    private Matcher matcher;

    private static final String EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

    public boolean validate(final String emailAddress)
    {
        if (StringUtils.isBlank(emailAddress))
        {
            return false;
        }

        this.pattern = Pattern.compile(EMAIL_PATTERN);
        this.matcher = this.pattern.matcher(emailAddress);
        return this.matcher.matches();
    }
}
