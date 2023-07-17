package com.unit.tts;

import com.iflytek.cloud.speech.*;
import javax.sound.sampled.*;
import java.io.*;
import java.util.concurrent.TimeUnit;
import java.io.IOException;

public class TtsStream {
    private static final String APPID = "71183651";
    private static final String API_SECRET = "ZDQ1MzQ2OWY2ZDhhMzZmZGYwMmFjYTYz";
    private static final String API_KEY = "07177fee620863474dd3eee16bb2d9fb";
    private static final String SPEED = "50"; //语速：0-100
    private static final String PITCH = "50"; //音调：0-100
    private static final String VOLUME = "50"; //音量：0-100
    private static final String VOICE_NAME = "xiaoyan"; //发音人，可在官网上选择自己喜欢的发音人
    //采样率
    private static float RATE = 16000;
    //编码格式PCM
    private static AudioFormat.Encoding ENCODING = AudioFormat.Encoding.PCM_SIGNED;
    //帧大小 16
    private static int SAMPLE_SIZE = 16;
    //是否大端
    private static boolean BIG_ENDIAN = false;
    //通道数
    private static int CHANNELS = 1;  //1单通道  2双通道

    public byte[] getAudio(String text) {
        SpeechSynthesizer mTts = SpeechSynthesizer.createSynthesizer();
        mTts.setParameter(SpeechConstant.ENGINE_TYPE, SpeechConstant.TYPE_CLOUD);
        mTts.setParameter(SpeechConstant.VOICE_NAME, VOICE_NAME);
        mTts.setParameter(SpeechConstant.SPEED, SPEED);
        mTts.setParameter(SpeechConstant.PITCH, PITCH);
        mTts.setParameter(SpeechConstant.VOLUME, VOLUME);
        mTts.synthesizeToUri(text, "./tts_test.pcm", null);
        byte[] audioData = null;

        File pcmFile = new File("./tts_test.pcm");
        try (FileInputStream fis = new FileInputStream(pcmFile)) {
            audioData = fis.readAllBytes();
            System.out.println(audioData.length);
            // TODO: 处理音频数据
        } catch (IOException e) {
            e.printStackTrace();
        }
        return audioData;
    };

    public void start(String test) {
        SpeechSynthesizer mTts = SpeechSynthesizer.createSynthesizer();
        mTts.setParameter(SpeechConstant.ENGINE_TYPE, SpeechConstant.TYPE_CLOUD);
        mTts.setParameter(SpeechConstant.VOICE_NAME, VOICE_NAME);
        mTts.setParameter(SpeechConstant.SPEED, SPEED);
        mTts.setParameter(SpeechConstant.PITCH, PITCH);
        mTts.setParameter(SpeechConstant.VOLUME, VOLUME);
//        //设置合成音频保存位置（可自定义保存位置），默认保存在“./tts_test.pcm”
//        mTts.setParameter(SpeechConstant.TTS_AUDIO_PATH, "./tts_test.mp3");
        mTts.startSpeaking(test, new SynthesizerListener() {
            @Override
            public void onBufferProgress(int i, int i1, int i2, String s) {}

            @Override
            public void onSpeakBegin() {
                System.out.println("开始播放");
            }

            @Override
            public void onSpeakProgress(int i, int i1, int i2) {}

            @Override
            public void onSpeakPaused() {}

            @Override
            public void onSpeakResumed() {}


            @Override
            public void onCompleted(SpeechError speechError) {
                System.out.println("播放完成");
            }

            @Override
            public void onEvent(int i, int i1, int i2, int i3, Object o, Object o1) {
            }
        });

        //等待播放完成
        while (mTts.isSpeaking()) {
            try {
                TimeUnit.MILLISECONDS.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
