import { LogEntity, LogSeverityLevel } from "../../entities/log-entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}
type SuccessCallbacks = (() => void) | undefined;
type ErrorCallback = ((err: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {


    constructor(
        private readonly successCallback: SuccessCallbacks,
        private readonly errorCallback: ErrorCallback,
        private readonly logRepository: LogRepository
    ) {

    }

    public async execute(url: string): Promise<boolean> {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error fetching ${url}`);
            }

            const newLog = new LogEntity(LogSeverityLevel.low, `Service ${url} working`)

            this.logRepository.saveLogs(newLog)

            this.successCallback && this.successCallback();
            return true;

        } catch (error) {

            const errorMessage = `${url} is not working - ${error}`
            const newLog = new LogEntity(LogSeverityLevel.high, errorMessage)
            this.logRepository.saveLogs(newLog)

            this.errorCallback && this.errorCallback(`${errorMessage}`);
            return false;
        }
    }
}