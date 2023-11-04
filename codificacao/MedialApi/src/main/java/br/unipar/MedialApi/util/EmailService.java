package br.unipar.MedialApi.util;

import br.unipar.MedialApi.model.modelQueue.EmailQueue;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;

import javax.mail.internet.MimeMessage;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;

@Slf4j
@Service
public class EmailService {
    private final BlockingQueue<EmailQueue> filaEmail = new LinkedBlockingQueue<>() ;
    private final Executor  executor = Executors .newSingleThreadExecutor();


    @Autowired JavaMailSender mailSender;

    private String emailRemetente = "medial.systems@gmail.com";
    private String[] emailDestinatario = {"tailonvprado@gmail.com",
                                          "tailon.prado@edu.unipar.br",
                                          "larilima.08santos@gmail.com",
                                          "larissa.Lima.02@edu.unipar.br"};

    @Async
    public void addEmailQueue(String assunto, String corpo){
        log.debug("addEmailQueue");
        EmailQueue emailQueue = new EmailQueue();

        emailQueue.setRemetente(emailRemetente);
        emailQueue.setDestinatario(emailDestinatario);
        emailQueue.setAssunto(assunto);
        emailQueue.setCorpo(corpo);

        filaEmail.add(emailQueue); // Adicione a email na fila
        executor.execute(this::processQueue); // starta o executor se ainda não estiver em execução
    }



    private void processQueue() {
        log.debug("processQueue");
        while (!filaEmail.isEmpty()) {
            try {
                EmailQueue emailQueue = filaEmail.take();
                sendEmail(emailQueue);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

    public void sendEmail(EmailQueue emailQueue){
        log.debug("sendEmail, emailQueue: "+ emailQueue.toString());
        if(emailQueue.getAssunto().isEmpty()){
            log.warn("Erro ao enviar email. Erro: Assunto do email vazio");
            return;
        } else if (emailQueue.getCorpo().isEmpty()) {
            log.error("Erro ao enviar email. Erro: Cortpo do email vazio");
            return;
        }else if(emailQueue.getDestinatario().length == 0){
            log.error("Erro ao enviar email. Erro: Destinatario não informado");
            return;
        }else if (emailQueue.getRemetente().isEmpty()) {
            emailQueue.setRemetente("medial.systems@gmail.com");
        }

        try{
            MimeMessage mail = mailSender.createMimeMessage();

            MimeMessageHelper message = new MimeMessageHelper(mail);
            message.setSubject(emailQueue.getAssunto());
            message.setText(emailQueue.getCorpo());
            message.setFrom(emailQueue.getRemetente());
            message.setTo(emailQueue.getDestinatario());

            mailSender.send(mail);
        }catch (Exception e){
            log.error("ERRO AO ENVIAR EMAIL. ERRO: "+e.getMessage());
        }
    }
}
