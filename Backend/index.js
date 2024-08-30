// I use import but you can use require
// const require = require(require());

import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import connectdb from "./config/db.js";
import userRouter from "./routes/userRouter.js"
import companyRouter from "./routes/companyRouter.js"
import jobRouter from "./routes/jobRouter.js"
import applicationRouter from "./routes/applicationRouter.js"



dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions={
    //origin:"0http://localhost:5173",
    origin:'https://job-hunting-seven.vercel.app',
    credentials : true
}
app.use(cors(corsOptions));

// 
app.use("/api/v1/user",userRouter);
app.use("/api/v1/company",companyRouter);
app.use("/api/v1/job", jobRouter)
app.use("/api/v1/application", applicationRouter)


const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Server is Running at ${PORT}`)
})

connectdb();


  