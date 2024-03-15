//if we now want to run with this require syntax then we can , but this ruine the code consistency so we use import module

//require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from ".db/index.js"

import mongoose from 'mongoose';
import {DB_NAME} from "./constants";
dotenv.config({
    path:'./env'
})

connectDB();



















//this is the simple way to connect the mongoDB to the backend project
/*
import express from 'express';
const app = express();

(async ()=> {
     try {
     await  mongoose.connect(`${process.env.MONGODB_URI}/ ${DB_NAME}`) 
     app.on("error", (error)=>{
        console.log("ERROR:", error);
        throw error
     })
     app.listen(process.env.PORT,()=>{
        console.log(`App is running on port ${process.env.PORT}`);
     })
     } catch (error) {
      console.error("ERROR" , error)
      throw err  
     }
})()
*/
