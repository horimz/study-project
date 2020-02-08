package com.markery.server.model.network;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class Header<T> {
    private String transactionTime;

    private T content;

    //response without content
    public static<T> Header<T> OK(){
        return (Header<T>) Header.builder()
                .transactionTime(LocalDateTime.now().toString())
                .build();
    }

    //response with content
    public static<T> Header<T> OK(T content){
        return (Header<T>) Header.builder()
                .transactionTime(LocalDateTime.now().toString())
                .content(content)
                .build();
    }

    public static<T> Header<T> ERROR(){
        return (Header<T>) Header.builder()
                .transactionTime(LocalDateTime.now().toString())
                .build();
    }

}
