import express,{Request,Response} from "express"
import {GoodHabit,BadHabit} from "../model/habitSchema"

const landingPage=async (req:Request,res:Response)=>{
    try {
        const goodHabit = await GoodHabit.find()
        const badHabit = await BadHabit.find()
        console.log(goodHabit)
        // console.log("good habit ",goodHabit)
        // console.log("bad habit ",badHabit)

        // goodHabit.forEach(habit => {
        //     const startDate = new Date(habit.startDate);
        //     const today = new Date();
        //     const count = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 3600 * 24)); // Calculate days passed
        //     habit.count = count; // Update count dynamically
        // });
        
        // badHabit.forEach(habit => {
        //     const startDate = new Date(habit.startDate);
        //     const today = new Date();
        //     const count = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 3600 * 24)); // Calculate days passed
        //     habit.count = count; 
        // });
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

const addHabitValue = async(req:Request,res:Response)=>{
    try {
        const {habitName,description,habitType} = req.body
        if(habitType === 'bad'){
            const badHabit = new BadHabit({
                name:habitName,
                description:description,
                startDate:Date.now(),
                count:0,
                type:'bad'
            })
            const data=await badHabit.save()
            
        }
        if(habitType === 'good'){
            const goodHabit = new GoodHabit({
                name:habitName,
                description:description,
                startDate:Date.now(),
                count:0,
                type:'good'
            })
            const data = await goodHabit.save()
        }
        res.redirect('/')
    } catch (error) {
        if(error instanceof Error){
            console.log("error in add habit post "+error.message)
        }else{
            console.log("unknown error in add habit post")
        }
    }
}

//edit habit

const editHabit = async(req:Request,res:Response)=>{
    try {
        console.log(req.query)
        const {id,type} = req.query
        let habit
        if(type === 'good'){
            
            habit = await GoodHabit.findById(id)
            console.log(habit)
        }else if(type === 'bad'){
            habit = await BadHabit.findById(id)

        }
        
        res.render("editHabit",{habit})
    } catch (error) {
        if(error instanceof Error){
            console.log("error in edit habit get "+error.message)
        }else{
            console.log("unknown error in edit habit get")
        }
    }
}

const updateHabit = async(req:Request,res:Response)=>{
    try {
        console.log("inside put method")
        console.log(req.body)
        const {habitName,description,habitId,habitType} = req.body
        if(habitType === 'good'){
            await GoodHabit.findByIdAndUpdate(habitId,{$set:{name:habitName,description:description}})
        }else if(habitType === 'bad'){
            await BadHabit.findByIdAndUpdate(habitId,{$set:{name:habitName,description:description}})
        }
        res.redirect('/')
    } catch (error) {
        if(error instanceof Error){
            console.log("error in edit habit put "+error.message)
        }else{
            console.log("unknown error in edit habit put")
        }
    }
}

const deleteHabit = async(req:Request,res:Response)=>{
    try {
        console.log("inside delete habit")
        console.log(req.params)
        const {id,type} = req.params
        if(type === 'good'){
            const deleteGoodHabit = await GoodHabit.findByIdAndDelete(id)
            if(!deleteGoodHabit){
                res.status(400).json({message:"habit not found"})
                return
            }
        }
        if(type === 'bad'){
            const deleteBadHabit = await BadHabit.findByIdAndDelete(id)
            if(!deleteBadHabit){
                res.status(400).json({message:"habit not found"})
                return
            }
        }
         res.status(200).json({ message: "Habit deleted successfully" });
    } catch (error) {
        if(error instanceof Error){
            console.log("error in edit habit put "+error.message)
        }else{
            console.log("unknown error in edit habit put")
        }
         res.status(500).json({message:"error in delete habit"})
    }
}

const disableHabit=async(req:Request,res:Response)=>{
    try {
        console.log("inside disabled habit")
        console.log(req.body)
        const {id,type} = req.body
        
        if(type === 'good'){
            const habit = await GoodHabit.findById(id)
            const startDate = new Date(habit!.startDate);
            const today = new Date();
            const days =  Math.floor((today.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
            
            await GoodHabit.findByIdAndUpdate(id,{$set:{status:"stopped"},$push:{days:{ $each: [days], $slice: -5 }}})
        }else if(type === 'bad'){
            const habit = await BadHabit.findById(id)
            const startDate = new Date(habit!.startDate)
            const today = new Date()
            const days = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
            console.log(days)
            await BadHabit.findByIdAndUpdate(id,{$set:{status:"stopped"},$push:{days:{$each:[days],$slice:-5}}})
        }
        
        res.status(200).json({ message: "habit disabled" });
        return
    } catch (error) {
        if(error instanceof Error){
            console.log("error in disabled habit put "+error.message)
        }else{
            console.log("unknown error in disabled put")
        }
         res.status(500).json({message:"error in disabled habit"})
         return
    }
}


export {
    landingPage,
    addHabit,
    addHabitValue,
    editHabit,
    updateHabit,
    deleteHabit,
    disableHabit
}