import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db';
connectDb()
const app =express()

dotenv.config()


const port = process.env.PORT

console.log("server run "+port)

