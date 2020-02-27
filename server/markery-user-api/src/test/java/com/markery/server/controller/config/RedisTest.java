package com.markery.server.controller.config;

import org.aspectj.lang.annotation.After;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.hamcrest.MatcherAssert.assertThat;

//@SpringBootTest
//public class RedisTest {
//
//    @Autowired
//    private PointRedisRepository pointRedisRepository;
//
//    @After
//    public void tearDown() throws Exception {
//        pointRedisRepository.deleteAll();
//    }
//
//    @Test
//    public void 기본_등록_조회기능() {
//        //given
//        String id = "jojoldu";
//        LocalDateTime refreshTime = LocalDateTime.of(2018, 5, 26, 0, 0);
//        Point point = Point.builder()
//                .id(id)
//                .amount(1000L)
//                .refreshTime(refreshTime)
//                .build();
//
//        //when
//        pointRedisRepository.save(point);
//
//        //then
//        Point savedPoint = pointRedisRepository.findById(id).get();
//        assertThat(savedPoint.getAmount()).isEqualTo(1000L);
//        assertThat(savedPoint.getRefreshTime()).isEqualTo(refreshTime);
