import { EmailService } from "../../../presentation/email/emai.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log-entity";
import { LogRepository } from "../../repository/log.repository";


interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {


    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ) { }

    async execute(to: string | string[]) {


        try {

            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);

            if (!sent) {
                throw new Error("Email log not sent " + to);
            }

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: "Log email sent successfully",
                createAt: new Date(),
                origin: "email.service.ts"
            })

            this.logRepository.saveLogs(log)

            return true;

        } catch (error) {

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: "Log email sent successfully",
                createAt: new Date(),
                origin: "email.service.ts"
            })

            this.logRepository.saveLogs(log)

            console.error('Error sending logs email', error);
            
            return false;

        }

    };

}