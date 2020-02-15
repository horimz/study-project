package com.markery.server.controller;

import com.markery.server.model.entity.User;
import com.markery.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody User resoruces) throws URISyntaxException {

        String userName = resoruces.getUserName();
        String email = resoruces.getEmail();
        String password = resoruces.getPassword();
        String registerAt = LocalDateTime.now().toString();

        userService.register(userName, email, password, registerAt);

        String url = "/users";
        return ResponseEntity.created(new URI(url)).body("{}");
    }
}
