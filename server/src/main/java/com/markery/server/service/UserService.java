package com.markery.server.service;

import com.markery.server.model.entity.User;
import com.markery.server.repository.UserRepository;
import com.markery.server.service.exception.EmailNotFoundException;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(String userName, String email, String password, String createdAt){
        Optional<User> existed = userRepository.findByEmail(email);
        if(existed.isPresent()){
            throw new EmailNotFoundException(email);
        }

        String encodedPassword = passwordEncoder.encode(password);

        User user = User.builder()
                .userName(userName)
                .email(email)
                .password(encodedPassword)
                .registeredAt(createdAt)
                .updatedAt(createdAt)
                .build();

        return userRepository.save(user);
    };

}
