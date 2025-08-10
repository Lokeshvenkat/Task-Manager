const mongoose = require("mongoose");

// Define schema for a Task document
const taskSchema = new mongoose.Schema({
  // Reference to the user who owns this task
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Links to User collection
    required: true
  },
  // Task description text
  description: {
    type: String,
    required: true,
  },
}, {
  // Automatically adds createdAt and updatedAt fields
  timestamps: true
});

// Create Task model from the schema
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
