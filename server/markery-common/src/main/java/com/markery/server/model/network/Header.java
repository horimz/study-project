package com.markery.server.model.network;

import lombok.*;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Header<T> {

    private String transactionTime;

    @Valid
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

    public static<T> Header<T> ERROR(T content){
        return (Header<T>) Header.builder()
                .transactionTime(LocalDateTime.now().toString())
                .content(content)
                .build();
    }

}
