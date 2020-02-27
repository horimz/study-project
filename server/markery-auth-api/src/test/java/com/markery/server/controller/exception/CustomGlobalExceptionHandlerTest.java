package com.markery.server.controller.exception;

import com.markery.server.model.network.Header;
import com.markery.server.model.network.response.Error;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.context.request.WebRequest;

import static org.junit.jupiter.api.Assertions.*;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class CustomGlobalExceptionHandlerTest {

    @Autowired
    private CustomGlobalExceptionHandler customGlobalExceptionHandler;


    @Mock
    private MethodArgumentNotValidException ex;

    private HttpHeaders httpHeaders;

    private HttpStatus httpStatus;

    @Mock
    private WebRequest webRequest;

    @BeforeAll
    public void setUp(){
        MockitoAnnotations.initMocks(this);
        httpHeaders = HttpHeaders.EMPTY;
        httpStatus = HttpStatus.BAD_REQUEST;
    }

    @Test
    public void createError(){

        ResponseEntity<Object> error = customGlobalExceptionHandler.handleMethodArgumentNotValid(
                ex, httpHeaders, httpStatus, webRequest
        );

        Header<Error> result = (Header<Error>) error.getBody();
        Error content = result.getContent();
        assertEquals(content.getStatus(), "400" );
    }
}