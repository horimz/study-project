package com.markery.server.service.exception;

public class EmailFormatWrongException extends RuntimeException{
    public EmailFormatWrongException(String email){
        super("email is duplicatied");
    }
}
