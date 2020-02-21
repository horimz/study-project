package com.markery.server.model.network.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthenticationRequest {
    private String email;

    private String password;

    private String passwordValidator;
}
