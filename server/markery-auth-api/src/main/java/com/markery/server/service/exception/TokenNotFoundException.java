package com.markery.server.service.exception;

public class TokenNotFoundException extends RuntimeException {
    String message;

    public TokenNotFoundException() {
        this.message = "Token Not Found";
    }

    @Override
    public String getMessage(){
        return message;
    }
}
