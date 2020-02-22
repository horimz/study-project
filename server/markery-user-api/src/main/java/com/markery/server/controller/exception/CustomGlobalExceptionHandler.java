package com.markery.server.controller.exception;

import com.markery.server.model.network.Header;
import com.markery.server.model.network.response.Error;
import com.markery.server.service.exception.EmailAlreadyExistedException;
import com.markery.server.service.exception.EmailNotFoundException;
import com.markery.server.service.exception.PasswordValidatorWrongException;
import com.markery.server.service.exception.PasswordWrongException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class CustomGlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatus status, WebRequest request) {

        //Get all errors
        String message = ex.getMessage();
//        List<String> errors = ex.getBindingResult()
//                .getFieldErrors()
//                .stream()
//                .map(x -> x.getDefaultMessage())
//                .collect(Collectors.toList());

        Error error = Error.builder()
                .status(status.value())
                .description(message)
                .build();

        Header bodyHeader = Header.ERROR(error);

        return new ResponseEntity<>(bodyHeader, headers, status);
    }

    @ExceptionHandler(value = {EmailAlreadyExistedException.class,
            PasswordValidatorWrongException.class,
            EmailNotFoundException.class,
            PasswordWrongException.class})
    public ResponseEntity<Header<Error>> ServiceExceptionHandler(Exception ex, WebRequest request) {

        //Get all errors
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        String message = ex.getMessage();

        Error error = Error.builder()
                .status(status.value())
                .description(message)
                .build();

        Header bodyHeader = Header.ERROR(error);

        return new ResponseEntity<Header<Error>>(bodyHeader, null, status);
    }


}
