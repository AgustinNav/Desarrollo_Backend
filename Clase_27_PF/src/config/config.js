import dotenv from "dotenv"
import {Command} from 'commander'

const program = new Command()

program
    .option('-d', 'variable para debug', false)
    .option('-p <port>', 'puerto del servidor', 8080)
    .option('--mode <mode>', 'modo de ejecucion', 'develop')
program.parse()

console.log("Mode options: ", program.opts().mode);

const enviroment = program.opts().mode;

dotenv.config({
    path:enviroment==="prod"?"./src/config/.env.prod":"./src/config/.env.dev"
})

export default {
    port: process.env.PORT,
    mongoURL: process.env.MONGO_URL,
    adminUser: process.env.ADMIN_USER,
    adminPass: process.env.ADMIN_PASS
}