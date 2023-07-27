const express = require("express");
const router = express.Router();

const { createTask, getUserTasks, updateTask, getSingleTask } = require("../controllers/taskController");

// Task routes

// creating task
router.post('/create-task',createTask);

// getting tasks assigned to specific user
router.get('/my-tasks/:userId', getUserTasks);

//getting single task 
router.get("/getSingleTask/:taskId", getSingleTask)

// updating task
router.put('/update-task/:taskId', updateTask);

module.exports = router