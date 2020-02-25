//package com.markery.server.mail;
//
//import com.sun.xml.internal.messaging.saaj.packaging.mime.MessagingException;
//import org.springframework.core.io.Resource;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessageHelper;
//
//import javax.activation.DataSource;
//import javax.mail.internet.MimeMessage;
//import java.io.File;
//import java.io.UnsupportedEncodingException;
//
//public class MailHandler {
//    private JavaMailSender sender;
//    private MimeMessage message;
//    private MimeMessageHelper messageHelper;
//
//    public MailHandler(JavaMailSender jSender) throws
//            MessagingException, javax.mail.MessagingException {
//        this.sender = jSender;
//        message = jSender.createMimeMessage();
//        messageHelper = new MimeMessageHelper(message, true, "UTF-8");
//
//    }
//    //이 이메일이 누구로부터 가는가.. 실제로 써본결과 그다지 중요하지 않은듯..잘  모르겠습니다.
//    public void setFrom(String email,String name) throws
//            UnsupportedEncodingException, MessagingException, javax.mail.MessagingException {
//        messageHelper.setFrom(email, name);
//    }
//    //누구에게 보낼 것인가.. 보낼사람의 이메일
//    public void setTo(String email) throws MessagingException, javax.mail.MessagingException {
//        messageHelper.setTo(email);
//    }
//    //보낼때 제목
//    public void setSubject(String subject) throws MessagingException, javax.mail.MessagingException {
//        messageHelper.setSubject(subject);
//    }
//    //보낼 메일의 내용.. 두번째 파라미터는 html을 적용할 것인가 아닌가. true시 html형식으로 작성하면 html형식으로 보임..
//    public void setText(String text) throws MessagingException, javax.mail.MessagingException {
//        messageHelper.setText(text, true);
//    }
//    //addInline메서드는 간단한 첨부파일을 보내는데 쓰이는 것 같습니다.(저는 아직 사용 해보지 않았습니다.)  https://docs.spring.io/spring/docs/3.0.0.M3/reference/html/ch26s03.html 에 가셔서 한번 보셔도 좋을 것 같습니다.
//    public void addInline(String contentId, Resource resource) throws
//            MessagingException, javax.mail.MessagingException {
//        messageHelper.addInline(contentId, resource);
//    }
//    public void addInline(String contentId, File file) throws
//            MessagingException, javax.mail.MessagingException {
//        messageHelper.addInline(contentId, file);
//    }
//    public void addInline(String contentId, DataSource source) throws
//            MessagingException, javax.mail.MessagingException {
//        messageHelper.addInline(contentId, source);
//    }
//    //실제로 메일을 보내는 메서드..
//    public void send() {
//        try {
//            sender.send(message);
//        }catch(Exception e) {
//            e.printStackTrace();
//        }
//    }
//}