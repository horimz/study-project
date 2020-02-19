package com.markery.server.model.network.request;

import com.markery.server.annotation.EmailCheck;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
public class UserRequest {

    @NotEmpty
    @EmailCheck
    private String email;

    @NotEmpty
    private String userName;

    @NotEmpty
    private String password;

    @NotEmpty
    private String passwordValidator;
}
