package com.markery.server.service;

import com.markery.server.model.entity.User;
import com.markery.server.model.network.Header;
import com.markery.server.model.network.request.AuthenticationRequest;
import com.markery.server.model.network.request.UserRequest;
import com.markery.server.model.network.response.AuthenticationResponse;
import com.markery.server.model.network.response.UserResponse;
import com.markery.server.repository.UserRepository;
import com.markery.server.service.exception.EmailAlreadyExistedException;
import com.markery.server.service.exception.EmailNotFoundException;
import com.markery.server.service.exception.PasswordValidatorWrongException;
import com.markery.server.service.exception.PasswordWrongException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserResponse register(Header<UserRequest> resource){

        String createdAt = resource.getTransactionTime();
        UserRequest userRequest = resource.getContent();

        Optional<User> existed = userRepository.findByEmail(userRequest.getEmail());
        if(existed.isPresent()){
            throw new EmailAlreadyExistedException();
        }

        if(!userRequest.getPassword().equals(userRequest.getPasswordValidator())){
            throw new PasswordValidatorWrongException();
        }

        String encodedPassword = passwordEncoder.encode(userRequest.getPassword());

        User user = User.builder()
                .userName(userRequest.getUserName())
                .email(userRequest.getEmail())
                .password(encodedPassword)
                .registeredAt(createdAt)
                .updatedAt(createdAt)
                .build();

        User result =  userRepository.save(user);

        return UserResponse.builder()
                .id(result.getId())
                .email(result.getEmail())
                .userName(result.getUserName())
                .build();
    };

    public User authenticate(Header<AuthenticationRequest> requestHeader){

        AuthenticationRequest authenticationRequest = requestHeader.getContent();

        User user = userRepository.findByEmail(authenticationRequest.getEmail()).orElseThrow(()->new EmailNotFoundException());
        if(!passwordEncoder.matches(authenticationRequest.getPassword(), user.getPassword())){
            throw new PasswordWrongException();
        }

        return user;
    }
}
