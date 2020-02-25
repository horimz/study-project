package com.markery.server.model.network.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Error {
    private Integer status;

    private String description;
}
