import express, { Application, Request, Response } from 'express';
import *as controllers from "../controller/controllers"



const router = express.Router()

router.get('/',controllers.landingPage)
router.get('/addHabit',controllers.addHabit)

export default router