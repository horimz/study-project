package com.markery.server.controller;

import com.markery.server.model.network.Header;
import com.markery.server.model.network.request.UserRequest;
import com.markery.server.model.network.response.UserResponse;
import com.markery.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Header<UserResponse>> create(@Valid @RequestBody Header<UserRequest> resoruce) throws URISyntaxException {

        UserResponse userResponse = userService.register(resoruce);
        String url = "/users/" + userResponse.getId();

        return ResponseEntity.created(new URI(url)).body(Header.OK());
    }
}
