package com.markery.server.service.exception;

import com.markery.server.model.network.Header;
import com.markery.server.model.network.response.Error;
import org.springframework.http.HttpStatus;

public class PasswordValidatorWrongException extends RuntimeException{

    String message;

    public PasswordValidatorWrongException() {
        this.message = "validator is different with password";
    }

    @Override
    public String getMessage(){
        return message;
    }
}
