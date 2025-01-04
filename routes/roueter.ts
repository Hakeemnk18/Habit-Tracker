import express, { Application, Request, Response } from 'express';
import *as controllers from "../controller/controllers"



const router = express.Router()

router.get('/',controllers.landingPage)

//add new habit
router.get('/addHabit',controllers.addHabit)
router.post('/addHabit',controllers.addHabitValue)

//edit habit
router.get('/editHabit',controllers.editHabit)
router.put('/editHabit',controllers.updateHabit)
export default router