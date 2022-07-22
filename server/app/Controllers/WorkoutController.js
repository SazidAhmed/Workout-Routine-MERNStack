const mongoose = require('mongoose');

//Models
const Workout = require('../Models/Workout');

//workout list
const workoutList = async (req, res) => {
  const workouts = await Workout.find({}).sort({createdAt: -1})

  res.status(200).json(workouts);
}

// get by ID
const workoutGetById = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such workout'})
    }
  
    const workout = await Workout.findById(id)
  
    if (!workout) {
      return res.status(404).json({error: 'No such workout'})
    }
  
    res.status(200).json(workout)
}

// create a new workout
const workoutCreate = async (req, res) => {
    const {title, load, reps} = req.body
  
    let emptyFields = []
  
    if (!title) {
      emptyFields.push('title')
    }
    if (!load) {
      emptyFields.push('load')
    }
    if (!reps) {
      emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
  
    // add to the database
    try {
      const workout = await Workout.create({ title, load, reps })
      res.status(200).json(workout)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
}

// update a workout
const workoutUpdate = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    const workout = await Workout.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!workout) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    res.status(200).json(workout)
}

// delete a workout
const workoutDelete = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    const workout = await Workout.findOneAndDelete({_id: id})
  
    if(!workout) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    res.status(200).json(workout)
}

module.exports = {
    workoutList,
    workoutGetById,
    workoutCreate,
    workoutUpdate,
    workoutDelete
}