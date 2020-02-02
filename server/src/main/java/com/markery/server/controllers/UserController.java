package com.markery.server.controllers;

import com.markery.server.models.entity.User;
import com.markery.server.models.network.Header;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
