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


}