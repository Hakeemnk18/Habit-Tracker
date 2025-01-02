import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connectDb=async():Promise<void>=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log("db connected")

    } catch (error) {
        if(error instanceof Error){
            console.log("error occure in connect db "+error.message)
        }else{
            console.log("unknown error occure in connect db")
        }
        
    }
}

export default connectDb