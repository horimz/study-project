package com.markery.server.service.exception;

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
