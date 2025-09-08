import { program , Option } from "commander";
import dotenv from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

program.option("-p, --port <PORT>","Puerto donde escuchará el server", 8080)
program.addOption(new Option("-m, --mode <MODE>","Modo de ejecucion").choices(['prod', 'dev']).default('prod'))

program.allowUnknownOption() // permite los comandos desconocidos
program.allowExcessArguments()  //  Permite argumentos excesivos

program.parse(process.argv);

const { mode } = program.opts();

const envFile = mode === "prod" ? ".env.prod" : ".env.dev";

const envPath = resolve(__dirname, `../${envFile}`);

dotenv.config({ path: envPath });

const config = {
    PORT : process.env.PORT,
    MONGO_URI : process.env.MONGO_URI,
    STORAGE : process.env.STORAGE,
    MODE: mode
}

export default config