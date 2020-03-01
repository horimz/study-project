package com.markery.server.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.markery.server.model.network.request.AuthenticationRequest;
import com.markery.server.model.network.request.FolderRequest;
import com.markery.server.service.FolderService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(FolderController.class)
class FolderControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private FolderService folderService;

    @Test
    public void create() throws Exception {

        FolderRequest authReq = FolderRequest.builder()
                .folderName("paper")
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        String requestJson = objectMapper.writeValueAsString(authReq);

        mvc.perform(post("/api/folders")
                .content(requestJson)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());

    }

}