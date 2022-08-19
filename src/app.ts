import { AddressInfo } from "net";
import {createServer} from "./utils/createServer";
import { logger } from "./utils/logger";
import {config} from "./utils/config";
import { connectToDb, disconnectFromDb } from "./utils/db";
import { disconnect } from "process";

const signals =["SIGINT", "SIGTERM", "SIGHUP"] as const;

async function gracefulShutDown({signal, server}:{signal: typeof signals[number], server: Awaited<ReturnType<typeof createServer>>}){
    logger.info(`Received ${signal}`);
    await server.close();
    logger.info(`Server closed`);
    await disconnectFromDb();
    logger.info(`Disconnected from database`);  
    process.exit(0);
}
    
async function startServer(){
    const server = await createServer();
    server.listen({
        port: config.PORT,
        host: config.HOST,
    });
    await connectToDb();

    for(let i=0; i<signals.length; i++){
        process.on(signals[i], async () => {
            await gracefulShutDown({signal: signals[i], server});
        } );
    }
    logger.info(`Server listening on port 4000`);
}
startServer()