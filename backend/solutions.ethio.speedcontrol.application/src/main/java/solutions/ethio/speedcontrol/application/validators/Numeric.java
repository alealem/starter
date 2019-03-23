package solutions.ethio.speedcontrol.application.validators;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

/**
 * The annotated String must contain digits only and must have equal length to the specified size.
 * Accepts String, <code>null</code> elements are considered as valid.
 */

@Documented
@Constraint(validatedBy = NumericConstraintValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Numeric
{
    int size();

    String message() default "{Numeric}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
