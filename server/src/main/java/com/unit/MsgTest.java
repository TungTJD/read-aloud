package com.unit;

import com.iflytek.cloud.speech.SpeechUtility;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

@SpringBootApplication
@EnableWebSocket
public class MsgTest {
    private static final String APPID = "71183651";
    public static void main(String[] args) {
        SpeechUtility.createUtility("appid=" + APPID);
        SpringApplication.run(MsgTest.class, args);
    }
}
