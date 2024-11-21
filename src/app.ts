import { MongoDatabase } from "./data/mongo";
import { envs } from "./plugins/envs.plugins";
import 'dotenv/config'
import { Server } from "./presentation/server";
import { PrismaClient } from "@prisma/client";

(async () => {
    main();
})();

async function main() {
   

    await MongoDatabase.connect(
        {
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        }
    )

    //const prisma = new PrismaClient();
   /*  const newLog = await prisma.logModel.create({
        data: {
            level: "HIGH",
            message: "Service started",
            origin: "App.ts"
        }
    })
    console.log("New log created: ", newLog); */

   /*  const logs = await prisma.logModel.findMany();

    console.log("All logs: ", logs); */
    Server.start();
    //console.log(envs);
}