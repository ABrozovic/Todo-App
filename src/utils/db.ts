import mongoose from "mongoose";
import { config } from "./config";
import { logger } from "./logger";

export function connectToDb(){
    try{
        const db = mongoose.connect(config.DATABASE_URL);       
        return db;
    }catch(e){
        logger.error(e, "Failed to connect to database");
        process.exit(1);
        
    }
}
export function disconnectFromDb(){
   return mongoose.connection.close();
}