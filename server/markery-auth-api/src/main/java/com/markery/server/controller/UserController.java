package com.markery.server.controller;

import com.markery.server.model.network.Header;
import com.markery.server.model.network.request.UserRequest;
import com.markery.server.model.network.response.UrlResponse;
import com.markery.server.model.network.response.UserResponse;
import com.markery.server.service.FolderService;
import com.markery.server.service.UserService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/auth/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private FolderService folderService;

    @PostMapping
    public ResponseEntity<Header<UserResponse>> create(
            @Valid @RequestBody Header<UserRequest> resoruce)
            throws URISyntaxException, javax.mail.MessagingException {
        String date = resoruce.getTransactionTime();
        UserResponse userResponse = userService.register(resoruce);
        String url = "/users/" + userResponse.getId();

        //TODO root 폴더 추가
        folderService.createRootFolder(userResponse.getId(), date);

        //TODO 이매일 전송 로직 추가
        return ResponseEntity.created(new URI(url)).body(Header.OK());
    }

    //TODO 이메일 valid bit 바꿔주는 엔드포인트 및 서비스 로직 구현
    @GetMapping("/validate")
    public ResponseEntity<Header<UserResponse>> validate(@RequestParam Long uid,
                                                         @RequestParam String email,
                                                         @RequestParam String authkey) throws URISyntaxException {

        boolean varifier = userService.validate(uid, email, authkey);

        String uri = "/auth/users/confirm";

        if(varifier)return ResponseEntity.ok().body(Header.OK());
        else return ResponseEntity.badRequest().body(Header.ERROR());
    }

    @GetMapping("/confirm")
    public Header<UserResponse> confirmToken(
            Authentication authentication
    ) throws URISyntaxException {

        Claims claims = (Claims)authentication.getPrincipal();
        Long uid = claims.get("uid", Long.class);

        UserResponse userResponse = userService.confirm(uid);
        return Header.OK(userResponse);
    }
}
