package com.markery.server.model.network.request;

import com.markery.server.annotation.EmailCheck;
import lombok.*;
import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {

    @EmailCheck(message = "invalid email format")
    private String email;

    private String userName;

    private String password;

    private String passwordValidator;
}
