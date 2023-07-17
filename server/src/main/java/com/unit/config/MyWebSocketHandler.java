package com.unit.config;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import com.unit.tts.TtsStream;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class MyWebSocketHandler extends TextWebSocketHandler {

    private List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();


    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        String msg = message.getPayload();
        // 科大语音合成
        TtsStream ttsDemo = new TtsStream();
        for (WebSocketSession webSocketSession : sessions) {
            if (webSocketSession.isOpen()) {
                byte[] Bytes = ttsDemo.getAudio(msg);
                BinaryMessage dataMsg = new BinaryMessage(Bytes);
                webSocketSession.sendMessage(dataMsg);
//                webSocketSession.sendMessage(new TextMessage(Base64.getEncoder().encodeToString(ttsDemo.getAudio(msg))));
            }
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
    }

}
