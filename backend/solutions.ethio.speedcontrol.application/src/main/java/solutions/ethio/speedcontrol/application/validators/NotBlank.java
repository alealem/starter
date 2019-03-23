package solutions.ethio.speedcontrol.application.validators;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

/**
 * The annotated String must contain atleast one character.
 * Accepts String. <code>null</code> elements are considered invalid.
 */
@Documented
@Constraint(validatedBy = NotBlankConstraintValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface NotBlank
{
    String message() default "{NotBlank}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
