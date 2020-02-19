package com.markery.server.annotation;

import com.markery.server.validation.EmailValidator;

import javax.lang.model.element.Element;
import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy ={EmailValidator.class})
public @interface EmailCheck {

    String message() default "";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default{};
}
