import { LogEntity, LogSeverityLevel } from "../../entities/log-entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>;
}
type SuccessCallbacks = (() => void) | undefined;
type ErrorCallback = ((err: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {


    constructor(
        private readonly successCallback: SuccessCallbacks,
        private readonly errorCallback: ErrorCallback,
        private readonly logRepository: LogRepository[]
    ) {

    }

    private callLogs(log: LogEntity): void {
        this.logRepository.forEach(logRepository => {
            logRepository.saveLogs(log)
        })
    }

    public async execute(url: string): Promise<boolean> {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error fetching ${url}`);
            }

            const options = {
                level: LogSeverityLevel.low,
                message: `Service ${url} working`,
                origin: 'check.service.ts'
            }
            const newLog = new LogEntity(options)

            this.callLogs(newLog)

            this.successCallback && this.successCallback();

            return true;

        } catch (error) {

            const errorMessage = `${url} is not working - ${error}`

            const options = {
                level: LogSeverityLevel.high,
                message: errorMessage,
                origin: 'check.service.ts'
            }

            const newLog = new LogEntity(options)

            this.callLogs(newLog)

            this.errorCallback && this.errorCallback(`${errorMessage}`);
            return false;
        }
    }
}