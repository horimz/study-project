package com.markery.server.service.exception;

import com.markery.server.model.network.Header;
import com.markery.server.model.network.response.Error;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class EmailNotFoundException extends RuntimeException{

    private String message;

    public EmailNotFoundException(){
        this.message = "email dosen't exsist";
    }

    @Override
    public String getMessage() {
        return message;
    }
}
