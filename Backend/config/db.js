import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connectdb = ()=>{

    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("DB is connecting Successfull")})
    .catch((error)=>{console.log(error)})
}

export default connectdb;