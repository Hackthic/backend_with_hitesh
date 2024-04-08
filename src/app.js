import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
 const app = express();

 app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credential: true
 }))
 app.use(express.json({limit:"16kb"}))
 app.use(express.urlencoded({extended:true, limit: "16kb"}))
 app.use(express.static("public"))
 app.use(cookieParser())
 


 //routes

 import userRouter from './routes/user.routes.js'



 //routes declaration
app.use("/api/v1/users", userRouter) //this will throw user at the register user page

//http://localhost:8000/users/login/register

 export {app}