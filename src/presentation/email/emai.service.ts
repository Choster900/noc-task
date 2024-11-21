import nodemailer from 'nodemailer';
import { envs } from '../../plugins/envs.plugins';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log-entity';

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

    constructor(
       // private readonly logRepository : LogRepository
    ){

    }

    async sendEmail(options: SendEmailOptions) : Promise<boolean> {

        const { to,subject,body, attachments = [] } = options

        try {
            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: body,
                attachments : attachments
            })

            return true;
            
        } catch (error) {
            
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