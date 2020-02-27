package com.markery.server.controller.exception;//package com.markery.server.controller.exception;
//
//import com.markery.server.model.network.response.Error;
//
//import com.markery.server.model.network.Header;
//import lombok.val;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.MethodArgumentNotValidException;
//import org.springframework.web.bind.MissingServletRequestParameterException;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//import org.springframework.web.context.request.WebRequest;
//
//
//
//@RestControllerAdvice
//public class UserEmailException {
//
//    private Header header;
//
//    @ExceptionHandler({MethodArgumentNotValidException.class})
//    public ResponseEntity<Header<Error>> emailFormatErrorHandler(MethodArgumentNotValidException ex, WebRequest request){
//
//        HttpStatus status = HttpStatus.UNPROCESSABLE_ENTITY;
//
//        Error error = Error.builder()
//                .status(status.value())
//                .description("Wrong Email Format")
//                .build();
//
//        header = Header.ERROR(error);
//        return new ResponseEntity<Header<Error>>(header, null, status);
//    }
//}
