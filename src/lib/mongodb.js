import mongoose from "mongoose"

const MongoDb_URI=process.env.MONGO_URI;

   if (!MongoDb_URI)
        throw new Error(
            "CRITICAL DATABASE ERROR: MONGODB_URL environment variable is undefined.",
        )

export async function ConnectDB(){
    try{
        if(mongoose.connection.readyState >= 1){
            return;
        }
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDb Connect Successfully')
    }
    catch(err){
        console.log('MongoDb Error -', err)
    }
}
