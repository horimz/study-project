package com.markery.server.controller;

import com.markery.server.model.entity.User;
import com.markery.server.model.network.request.AuthenticationRequest;
import com.markery.server.model.network.response.AuthenticationResponse;
import com.markery.server.service.UserService;
import com.markery.server.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/login")
public class LoginController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    public ResponseEntity<AuthenticationResponse> create(
            @RequestBody AuthenticationRequest resource
    ) throws URISyntaxException {

        String email = resource.getEmail();
        String password = resource.getPassword();

        User user = userService.authenticate(email, password);
        String accessToken = jwtUtil.createToken(user.getId(), user.getUserName());

        String url = "/login";
        return ResponseEntity.created(new URI(url)).body(
                AuthenticationResponse.builder()
                        .token(accessToken)
                        .build());
    }

}
