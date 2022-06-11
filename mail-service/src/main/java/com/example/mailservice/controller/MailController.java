package com.example.mailservice.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.internet.MimeMessage;

@RequiredArgsConstructor
@RestController
@Slf4j
public class MailController {

    private final JavaMailSender mailSender;

    @PostMapping("/mail-send")
    public String send() throws Exception {
        String content = "<h1>hello world</h1>";
        MimeMessage m = mailSender.createMimeMessage();
        MimeMessageHelper h = new MimeMessageHelper(m,"UTF-8");
        h.setFrom("cksgnlcjswoo@naver.com");
        h.setTo("cksgnlcjswoo@naver.com");
        h.setSubject("test");
        h.setText(content);
        mailSender.send(m);
        log.info("mail send success!");
        return content;
    }
}
