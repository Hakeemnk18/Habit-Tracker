import express, { Application, Request, Response } from 'express';



const router = express.Router()

router.get('/',(request:Request,response:Response)=>{
    console.log("inside router")
    response.render("index")
})

export default router