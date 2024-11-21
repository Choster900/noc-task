import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log-entity";


export class MongoLogDataSource implements LogDataSource {

    async saveLogs(logEntity: LogEntity): Promise<void> {

        const newLog = await LogModel.create(logEntity);
        console.log('Log saved successfully:', newLog);
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        const logs = await LogModel.find({
            level: severityLevel
        })

        return logs.map(LogEntity.fromObject);

    }

}