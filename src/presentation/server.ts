import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasources";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
)

export class Servcer {
    public static start() {
        console.log("server started");

        CronService.createJob(
            "*/2 * * * * *",
            () => {

                const baseUrl = "https://google.com";
                const localUrl = "http://localhost:3002";

                
                new CheckService(

                    () => console.log(`${localUrl} is running`),

                    ( error ) => console.log(error),

                    fileSystemLogRepository


                ).execute( localUrl );


                //new CheckService().execute('http://localhost:3000');
            }
        );
    }
}