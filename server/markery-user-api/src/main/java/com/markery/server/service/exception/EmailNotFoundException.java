package com.markery.server.service.exception;

public class EmailNotFoundException extends RuntimeException{
    public EmailNotFoundException(String email){
        super("email is duplicatied");
    }
}
