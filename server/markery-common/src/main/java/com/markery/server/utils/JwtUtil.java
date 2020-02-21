package com.markery.server.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Date;

public class JwtUtil {
    @Value("${spring.jwt.secret}")
    private Key secretKey;

    private long tokenValidMilisecond = 1000L * 60 * 60; // 1시간만 토큰 유효

    public JwtUtil(String secret) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
    }

    // Jwt 토큰 생성
    public String createToken(long userId, String userName) {

        Claims claims = Jwts.claims().setSubject("user");
        claims.put("uid", userId);
        claims.put("username", userName);

        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims) // 데이터
                .setIssuedAt(now) // 토큰 발행일자
                .setExpiration(new Date(now.getTime() + tokenValidMilisecond)) // set Expire Time
                .signWith(secretKey, SignatureAlgorithm.HS256) // 암호화 알고리즘, secret값 세팅
                .compact();
    }

    //전체 데이터 추출
    public Claims getClaims(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();

        return claims;
    }

    //
    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    // Request의 Header에서 token 파싱 : "X-AUTH-TOKEN: jwt토큰"
    public String resolveToken(HttpServletRequest req) {
        return req.getHeader("X-AUTH-TOKEN");
    }

}