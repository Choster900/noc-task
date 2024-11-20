import { envs } from "./plugins/envs.plugins";
import { Servcer } from "./presentation/server";
import 'dotenv/config'

(async () => {
    main();
})();

function main() {
   // Servcer.start();

   console.log(envs);
}