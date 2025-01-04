import express,{Request,Response} from "express"

const landingPage=async (req:Request,res:Response)=>{
    try {
        res.render("index")
    } catch (error) {
        if(error instanceof Error){
            console.log("error in landing page get"+error.message)
        }else{
            console.log("unknown error in landing page get")
        }
    }
}

export {landingPage}