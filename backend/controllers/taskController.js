const Task = require("../models/TaskModel");
const { validateObjectId } = require("../utils/validation");

// Get all tasks for the logged-in user
exports.getTasks = async (req, res) => {
  try {
    // Fetch all tasks belonging to the authenticated user
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json({ tasks, status: true, msg: "Tasks found successfully.." });
  }
  catch (err) {
    console.error(err); // Log error for debugging
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

// Get a single task by its ID (only if it belongs to the user)
exports.getTask = async (req, res) => {
  try {
    // Validate task ID format
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    // Fetch task that matches both user ID and task ID
    const task = await Task.findOne({ user: req.user.id, _id: req.params.taskId });
    if (!task) {
      return res.status(400).json({ status: false, msg: "No task found.." });
    }
    res.status(200).json({ task, status: true, msg: "Task found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

// Create a new task for the logged-in user
exports.postTask = async (req, res) => {
  try {
    const { description } = req.body;
    // Ensure task description is provided
    if (!description) {
      return res.status(400).json({ status: false, msg: "Description of task not found" });
    }
    // Save new task in DB linked to the current user
    const task = await Task.create({ user: req.user.id, description });
    res.status(200).json({ task, status: true, msg: "Task created successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

// Update an existing task by ID (only if it belongs to the user)
exports.putTask = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ status: false, msg: "Description of task not found" });
    }

    // Validate ID format
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    // Check if the task exists
    let task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(400).json({ status: false, msg: "Task with given id not found" });
    }

    // Prevent users from updating tasks they don't own
    if (task.user != req.user.id) {
      return res.status(403).json({ status: false, msg: "You can't update task of another user" });
    }

    // Update and return the new task data
    task = await Task.findByIdAndUpdate(req.params.taskId, { description }, { new: true });
    res.status(200).json({ task, status: true, msg: "Task updated successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

// Delete a task by ID (only if it belongs to the user)
exports.deleteTask = async (req, res) => {
  try {
    // Validate ID format
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    // Check if the task exists
    let task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(400).json({ status: false, msg: "Task with given id not found" });
    }

    // Prevent deleting tasks owned by other users
    if (task.user != req.user.id) {
      return res.status(403).json({ status: false, msg: "You can't delete task of another user" });
    }

    // Delete the task
    await Task.findByIdAndDelete(req.params.taskId);
    res.status(200).json({ status: true, msg: "Task deleted successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}
