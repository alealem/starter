package solutions.ethio.speedcontrol.application.validators;

import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class RegexValidator implements ConstraintValidator<RegexCompile, String>
{
    @Override
    public void initialize(final RegexCompile annotation)
    {
    }

    @Override
    public boolean isValid(final String value, final ConstraintValidatorContext context)
    {
        if (value == null)
        {
            return false;
        }
        try
        {
            Pattern.compile(value);
            return true;
        }
        catch (final PatternSyntaxException e)
        {
            return false;
        }
    }
}
