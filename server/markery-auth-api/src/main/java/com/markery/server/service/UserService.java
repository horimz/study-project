package com.markery.server.service;

import com.markery.server.model.entity.User;
import com.markery.server.model.network.Header;
import com.markery.server.model.network.request.AuthenticationRequest;
import com.markery.server.model.network.request.UserRequest;
import com.markery.server.model.network.response.UserResponse;
import com.markery.server.repository.UserRepository;
import com.markery.server.service.exception.EmailAlreadyExistedException;
import com.markery.server.service.exception.EmailNotFoundException;
import com.markery.server.service.exception.PasswordValidatorWrongException;
import com.markery.server.service.exception.PasswordWrongException;
import com.markery.server.utils.MailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
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

    @Autowired
    private JavaMailSender mailSender;

    public UserResponse register(Header<UserRequest> resource) throws javax.mail.MessagingException {

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

        //이메일 전송
        sednEmail(result);

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

    public boolean validate(Long uid, String email, String authKey){
        User user = userRepository.findById(uid).orElseThrow(null);

        if(user.getPassword().substring(10,20).equals(authKey) && user.getEmail().equals(email)){
            user.setVerified(true);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public UserResponse confirm(Long uid){
        User user = userRepository.findById(uid).orElseThrow(null);
        UserResponse userResponse = UserResponse.builder()
                .id(user.getId())
                .userName(user.getUserName())
                .email(user.getEmail())
                .build();

        return userResponse;
    }

    public void sednEmail(User user) throws javax.mail.MessagingException {
        MailUtil sendMail = new MailUtil(mailSender);
        String responseUrl = "http://ec2-15-164-38-191.ap-northeast-2.compute.amazonaws.com:8000/auth/users/validate";
        sendMail.setSubject("Markery 이메일 인증");
        sendMail.setText(new StringBuffer().append("<h1>[이메일 인증]</h1>")
                .append("<p>아래 링크를 클릭하시면 이메일 인증이 완료됩니다.</p>")
                .append("<a href=" + responseUrl + "?uid=")
                .append(user.getId())
                .append("&email=")
                .append(user.getEmail())
                .append("&authkey=")
                .append(user.getPassword().substring(10, 20))
                .append("' target='_blenk'>이메일 인증 확인</a>")
                .toString());
        sendMail.setTo(user.getEmail());
        sendMail.send();
    }
}
