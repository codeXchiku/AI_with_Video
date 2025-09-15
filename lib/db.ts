import mongoose from "mongoose";

const mongodb_env = process.env.MONGODB_URI!

if(!mongodb_env){
    throw new Error("please define mongo_uri in env")
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose={conn:null,promise:null}
}

export async function connectToDB() {
    if(cached.conn){
        return cached.conn
    }
    if (!cached.promise) {
        mongoose
        .connect(mongodb_env)
        .then(()=>mongoose.connection)
    }

    try {
        cached.conn = await cached.promise 
    } catch (error) {
        cached.promise = null
        throw error
    }
    return cached.conn
}
