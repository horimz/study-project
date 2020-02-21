package com.markery.server.utils;

import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.StringContains.containsString;

class JwtUtilTest {

    private static final String SECRET = "12345678901234567890123456789012";

    private JwtUtil jwtUtil;

    private String testToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwidWlkIjoxMiwidXNlcm5hbWUiOiJwYXBlciIsImlhdCI6MTU4MjMwNjI4NCwiZXhwIjoxNTgyMzA5ODg0fQ.XTMCxDyIenKnMTKBIWMKArbstD_t3istB_EZpktsGMA";

    @BeforeEach
    public void setUp(){
        jwtUtil = new JwtUtil(SECRET);
    }

    @Test
    public void create(){
        String token = jwtUtil.createToken(12, "paper");
        assertThat(token, containsString("."));
    }

    @Test
    public void getclaims(){
        Claims claims = jwtUtil.getClaims(testToken);
        String uid = claims.get("uid").toString();
        String username = claims.get("username").toString();

        assertThat(uid, is("12"));
        assertThat(username, is("paper"));
    }

    @Test
    public void validate(){
        boolean validator = jwtUtil.validateToken(testToken);

        assertThat(validator, is(true));
    }

    @Test
    public void resolveToken(){

    }

}