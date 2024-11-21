import { MongoDatabase } from "./data/mongo";
import { envs } from "./plugins/envs.plugins";
import 'dotenv/config'
import { Server } from "./presentation/server";

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

    Server.start();
    //console.log(envs);
}