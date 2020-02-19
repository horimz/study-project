package com.markery.server.service.exception;

import com.markery.server.model.network.Header;
import com.markery.server.model.network.response.Error;
import org.springframework.http.HttpStatus;

public class EmailAlreadyExistedException extends RuntimeException{

    String message;

    public EmailAlreadyExistedException() {
        this.message = "email already existed";
    }

    @Override
    public String getMessage(){
        return message;
    }
}
