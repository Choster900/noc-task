import { CronJob } from "cron";

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {
    static createJob(crontime: CronTime, onTick: OnTick) {
        const job = new CronJob(crontime, onTick);
        job.start();
    }
}
