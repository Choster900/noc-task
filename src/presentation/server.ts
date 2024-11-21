import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/emails/send-email-log";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasources";
import { MongoLogDataSource } from "../infraestructure/datasources/mongo-logs.datasources";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/emai.service";

/* const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
) */
const LogRepository = new LogRepositoryImpl(
   // new FileSystemDataSource()
   new FileSystemDataSource
)
const emailService = new EmailService();

export class Server {
    public static start() {
        console.log("server started");

        // COMENTADO PARA NO ENVAR CORREOS LA INICIAR LA APP
        /* new SendEmailLogs(
            emailService,
            fileSystemLogRepository
        ).execute(
            ["16adonaysergio@gmail.com"]
        ); */

        /* const emailService = new EmailService(
            fileSystemLogRepository
        );

        emailService.sendEmailWithFileSystemLogs(
            ["16adonaysergio@gmail.com"]
        ); */
        
        /* emailService.sendEmail({
            to: "16adonaysergio@gmail.com",
            subject: "Server Status",
            body: 
            `
                <h3>Server Status</h3>
                <p>Local Server: <span style="color: green;">Running</span></p>
                <p>Remote Server: <span style="color: red;">Not Running</span></p>
                <p>Database: <span style="color: orange;">Not Connected</span></p>
                <p>API: <span style="color: blue;">Not Available</span></p>
                <p>Logs: <span style="color: purple;">Low Severity</span></p>
            `
        }); */


        CronService.createJob(
            "*/2 * * * * *",
            () => {

                const baseUrl = "https://dsdsdds.com";
                const localUrl = "http://localhost:3002";

                
                new CheckService(

                    () => console.log(`${baseUrl} is running`),

                    ( error ) => console.log(error),

                    LogRepository


                ).execute( baseUrl );

            }
        );
    }
}