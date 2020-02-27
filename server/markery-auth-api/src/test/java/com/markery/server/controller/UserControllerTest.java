package com.markery.server.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.markery.server.controller.UserController;
import com.markery.server.model.network.Header;
import com.markery.server.model.network.request.UserRequest;
import com.markery.server.model.network.response.UserResponse;
import com.markery.server.service.UserService;
import org.aspectj.lang.annotation.Before;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.WebApplicationContext;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private UserService userService;

    @Autowired
    private UserController userController;

    @BeforeEach
    public void setUp(){
//        mvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    public void create() throws Exception {

        String userName = "paper";
        String email = "paper@naver.com";
        String password = "paper";

        UserRequest userRequest = UserRequest.builder()
                .userName(userName)
                .email(email)
                .password(password)
                .passwordValidator(password)
                .build();

        Header resouce = Header.OK(userRequest);

        UserResponse userResponse = UserResponse.builder()
                .id(1L)
                .userName(userName)
                .email(email)
                .build();

        given(userService.register(any()))
                .willReturn(userResponse);

        ObjectMapper objectMapper = new ObjectMapper();
        String requestJson = objectMapper.writeValueAsString(resouce);

        mvc.perform(post("/users")
                .content(requestJson)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());

    }
}