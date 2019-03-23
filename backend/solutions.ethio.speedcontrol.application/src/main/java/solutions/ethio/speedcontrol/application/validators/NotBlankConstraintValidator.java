package solutions.ethio.speedcontrol.application.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.apache.commons.lang3.StringUtils;

public class NotBlankConstraintValidator implements ConstraintValidator<NotBlank, String>
{
    @Override
    public void initialize(final NotBlank notBlank)
    {
    }

    @Override
    public boolean isValid(final String targetString, final ConstraintValidatorContext cxt)
    {
        return StringUtils.isNotBlank(targetString);
    }
}
