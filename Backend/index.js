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
import path from "path"
import { fileURLToPath } from 'url';


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


// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all other routes and redirect to the frontend's index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Server is Running at ${PORT}`)
})

connectdb();


  