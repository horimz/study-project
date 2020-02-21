package com.markery.server.service.exception;

public class EmailNotFoundException extends RuntimeException{
    private String message;

    public EmailNotFoundException(){
        this.message = "email dosent exist";
    }

    @Override
    public String getMessage(){
        return message;
    }
}
