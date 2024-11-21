import { PrismaClient } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log-entity';

const prisma = new PrismaClient();

export class PostgresLogDataSource implements LogDataSource {
    async saveLogs(logEntity: LogEntity): Promise<void> {

        try {

            const logLevel = this.mapToSeverityLevel(logEntity.level);


            const newLog = await prisma.logModel.create({
                data: {
                    level: logLevel,
                    message: logEntity.message,
                    origin: logEntity.origin
                }
            });

            console.log("New log created in repository: ", newLog);

        } catch (error) {

            console.error("Error saving log to repository: ", error);

        }
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        const logLevel = this.mapToSeverityLevel(severityLevel);


        const logs = await prisma.logModel.findMany({
            where: {
                level: logLevel
            }
        });
        
        return logs.map(log => LogEntity.fromObject(log));
    }


    private mapToSeverityLevel(level: string): "LOW" | "MEDIUM" | "HIGH" {
        switch (level) {
            case "low":
                return "LOW";
            case "medium":
                return "MEDIUM";
            case "high":
                return "HIGH";
            default:
                throw new Error(`Unknown severity level: ${level}`);
        }
    }
}