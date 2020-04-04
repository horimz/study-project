package com.markery.server.utils;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.activation.DataSource;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

public class MailUtil {
    private JavaMailSender mailSender;
    private MimeMessage message;
    private MimeMessageHelper messageHelper;

    public MailUtil(JavaMailSender mailSender) throws javax.mail.MessagingException {
        this.mailSender = mailSender;
        message = this.mailSender.createMimeMessage();
        messageHelper = new MimeMessageHelper(message, true, "UTF-8");
    }

    public void setSubject(String subject) throws javax.mail.MessagingException {
        messageHelper.setSubject(subject);
    }

    public void setText(String htmlContent) throws javax.mail.MessagingException {
        messageHelper.setText(htmlContent, true);
    }

    public void setFrom(String email, String name) throws UnsupportedEncodingException, javax.mail.MessagingException {
        messageHelper.setFrom(email, name);
    }

    public void setTo(String email) throws javax.mail.MessagingException {
        messageHelper.setTo(email);
    }

    public void addInline(String contentId, DataSource dataSource) throws javax.mail.MessagingException {
        messageHelper.addInline(contentId, dataSource);
    }

    public void send() {
        mailSender.send(message);
    }

    //custrom sending function

}
