package solutions.ethio.speedcontrol.application.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class NumericConstraintValidator implements ConstraintValidator<Numeric, String>
{
    private int annotationNumber;

    @Override
    public void initialize(final Numeric numeric)
    {
        this.annotationNumber = numeric.size();
    }

    @Override
    public boolean isValid(final String target, final ConstraintValidatorContext cxt)
    {
        if (target == null)
        {
            return true;
        }

        boolean isValidValue = false;

        if (validSize(target) && containsDigitsOnly(target))
        {
            isValidValue = true;
        }
        return isValidValue;
    }

    private boolean validSize(final String target)
    {
        return target.length() == this.annotationNumber;
    }

    public boolean containsDigitsOnly(final String s)
    {
        return s.matches("\\d*");
    }
}
