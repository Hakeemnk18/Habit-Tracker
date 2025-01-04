import express,{Request,Response} from "express"
import {GoodHabit,BadHabit} from "../model/habitSchema"

const landingPage=async (req:Request,res:Response)=>{
    try {
        const goodHabit = await GoodHabit.find()
        const badHabit = await BadHabit.find()
        console.log("good habit ",goodHabit)
        console.log("bad habit ",badHabit)
        res.render("index",{goodHabit,badHabit})

    } catch (error) {
        if(error instanceof Error){
            console.log("error in landing page get"+error.message)
        }else{
            console.log("unknown error in landing page get")
        }
    }
}

const addHabit = async(req:Request,res:Response)=>{
    try {
        res.render("addHabit")
    } catch (error) {
        if(error instanceof Error){
            console.log("error in add habit get"+error.message)
        }else{
            console.log("unknown error in add habit get")
        }
    }
}

export {landingPage,addHabit}