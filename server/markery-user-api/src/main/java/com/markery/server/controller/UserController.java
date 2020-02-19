package com.markery.server.controller;

import com.markery.server.model.entity.User;
import com.markery.server.model.network.Header;
import com.markery.server.model.network.request.UserRequest;
import com.markery.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Header<UserRequest> resoruce) throws URISyntaxException {

        UserRequest content = resoruce.getContent();

        String userName = content.getUserName();
        String email = content.getEmail();
        String password = content.getPassword();
        String registerAt = resoruce.getTransactionTime();

        userService.register(userName, email, password, registerAt);

        String url = "/users";
        return ResponseEntity.created(new URI(url)).body("{}");
    }
}
