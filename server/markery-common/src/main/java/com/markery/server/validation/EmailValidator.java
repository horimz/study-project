package com.markery.server.validation;

import com.markery.server.annotation.EmailCheck;
import org.apache.tomcat.util.buf.StringUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class EmailValidator implements ConstraintValidator<EmailCheck, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return (!value.isEmpty() && value.contains("@") && value.contains("."));
    }
}
