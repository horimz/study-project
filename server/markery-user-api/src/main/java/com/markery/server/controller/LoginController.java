package com.markery.server.controller;

import com.markery.server.model.entity.User;
import com.markery.server.model.network.Header;
import com.markery.server.model.network.request.AuthenticationRequest;
import com.markery.server.model.network.response.AuthenticationResponse;
import com.markery.server.service.UserService;
import com.markery.server.service.exception.TokenNotFoundException;
import com.markery.server.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/auth")
public class LoginController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<Header<AuthenticationResponse>> login(
            @RequestBody Header<AuthenticationRequest> resource
    ) throws URISyntaxException {

        User user = userService.authenticate(resource);
        String accessToken = jwtUtil.createToken(user.getId(), user.getUserName());

        String url = "/login";
        AuthenticationResponse response = AuthenticationResponse.builder()
                .token(accessToken)
                .build();

        return ResponseEntity.created(new URI(url)).body(Header.OK(response));
    }

    @GetMapping("/logout")
    public Header<?> logout(Authentication authentication) throws URISyntaxException {
        if(authentication == null){
            throw new TokenNotFoundException();
        }

        Claims claims = (Claims)authentication.getPrincipal();
        Long uid = claims.get("uid", Long.class);

        //TODO Add redis session to add blacklist

        return Header.OK();
    }
}
