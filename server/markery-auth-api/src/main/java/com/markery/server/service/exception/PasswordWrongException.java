package com.markery.server.service.exception;

import com.markery.server.model.network.Header;
import com.markery.server.model.network.response.Error;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class PasswordWrongException {

    private Header header;

    public PasswordWrongException(){
        Error error = Error.builder()
                .description("password dosen't match with email")
                .build();

        Header.ERROR(error);
    }
}
