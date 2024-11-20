
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions {

    level: LogSeverityLevel;
    message: string;
    createAt?: Date;
    origin: string;
}

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {

        const { message, level, createAt = new Date(), origin} = options;
        this.level = level;
        this.message = message;
        this.createAt = createAt;
        this.origin = origin;
    }

    static fromJson = (json: string): LogEntity => {

        const { message, level, createAt, origin } = JSON.parse(json);

        const log = new LogEntity({
            level,
            message,
            createAt,
            origin
        });
        
        log.createAt = new Date(createAt);

        return log;
    }
}