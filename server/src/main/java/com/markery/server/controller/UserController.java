package com.markery.server.controller;

import com.markery.server.model.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/users")
public class UserController {

    @PostMapping
    public ResponseEntity<?> create(@RequestBody User resoruces) throws URISyntaxException {
        User user = null;
        String url = "/users";
        return ResponseEntity.created(new URI(url)).body("{}");
    }
}
