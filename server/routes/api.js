const express = require('express');
const router = express.Router();

const {
    workoutList,
    workoutGetById,
    workoutCreate,
    workoutUpdate,
    workoutDelete
} = require('../app/Controllers/WorkoutController')

//Workout
router.get('/workoutList', workoutList)
router.get('/workoutList/:id', workoutGetById)
router.post('/workoutCreate',  workoutCreate)
router.patch('/workoutUpdate/:id', workoutUpdate)
router.delete('/workoutDelete/:id', workoutDelete)


module.exports = router