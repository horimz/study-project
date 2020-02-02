package com.markery.server.models.network;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Header<T> {
    private LocalDateTime transactionTime;

    private T data;

}
