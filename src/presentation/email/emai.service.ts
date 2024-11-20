import nodemailer from 'nodemailer';
import { envs } from '../../plugins/envs.plugins';

interface SendEmailOptions {
    to: string | string[];
    subject: string;
    body: string;
    attachments?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service : envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    async sendEmail(options: SendEmailOptions) : Promise<boolean> {

        const { to,subject,body, attachments = [] } = options

        try {
            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: body,
                attachments : attachments
            })

            console.log(sentInformation);
            


            return true;
            
        } catch (error) {
            

            console.error('Error sending email', error);
            return false;
        }
    }

    sendEmailWithFileSystemLogs(to: string | string[]){
        const subject = "Logs del servidor"

        const htmlBody = 
        `
            <h1>Logs del Servidor</h1>
            <p>Se adjunta el reporte de logs del último día.</p>

        `

        const attachments = [
            /* {
                filename: 'logs-all.log',
                path: './logs/logs-all.log',
            }, */
            {
                filename: 'logs-high.log',
                path: './logs/logs-high.log',
            },
            {
                filename: 'logs-medium.log',
                path: './logs/logs-medium.log',
            },
        ]

        return this.sendEmail({
            to,
            subject,
            body: htmlBody,
            attachments,
        })
    }
}