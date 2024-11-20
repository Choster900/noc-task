import { LogEntity, LogSeverityLevel } from '../entities/log-entity';

export abstract class LogRepository {
    
    abstract saveLogs(logEntity: LogEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
    
}