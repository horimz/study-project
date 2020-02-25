package com.markery.server.service.exception;

public class PasswordWrongException extends RuntimeException{

    private String message;

    public PasswordWrongException(){
        this.message = "wrong password";
    }

    @Override
    public String getMessage(){
        return message;
    }
}
