package solutions.ethio.speedcontrol.application.mail;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Slf4j
//@Component
public class NotificationMailer
{
/*    @Autowired
    public MailSender        mailSender;
    @Autowired
    public SimpleMailMessage templateMessage;*/

/*    public void sendMail(final String to, final String subject, final String body)
    {
        final SimpleMailMessage msg = new SimpleMailMessage(this.templateMessage);
        msg.setSubject(subject);
        msg.setText(body);
        if (StringUtils.isNotBlank(to))
        {
            msg.setTo(to);
        }

        try
        {
            this.mailSender.send(msg);
        }
        catch (final MailException e)
        {
            log.error("Could not send mail: " + msg + " , exception: ", e);
        }
    }

    public void sendAlertMailToDefaultRecipient(final String subject, final String body)
    {
        sendMail("", subject, body);
    }*/
}
