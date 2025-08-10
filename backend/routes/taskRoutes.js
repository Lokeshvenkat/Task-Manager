const express = require("express");
const router = express.Router();

// Import task controller functions to handle CRUD operations
const { getTasks, getTask, postTask, putTask, deleteTask } = require("../controllers/taskControllers");

// Middleware to verify JWT and attach user info to request
const { verifyAccessToken } = require("../middlewares.js");

// GET /api/tasks → Fetch all tasks for logged-in user
router.get("/", verifyAccessToken, getTasks);

// GET /api/tasks/:taskId → Fetch a single task by its ID
router.get("/:taskId", verifyAccessToken, getTask);

// POST /api/tasks → Create a new task for logged-in user
router.post("/", verifyAccessToken, postTask);

// PUT /api/tasks/:taskId → Update an existing task by its ID
router.put("/:taskId", verifyAccessToken, putTask);

// DELETE /api/tasks/:taskId → Remove a task by its ID
router.delete("/:taskId", verifyAccessToken, deleteTask);

module.exports = router;
