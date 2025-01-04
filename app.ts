import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db';
import router from './routes/roueter';
import methodOverride from "method-override"
connectDb()
const app =express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method')); 

app.set("view engine","ejs")
app.set("views","./views")

const port = process.env.PORT

app.use('/',router)

app.listen(port,()=>{
    console.log("server is running")
})

