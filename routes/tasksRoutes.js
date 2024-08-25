import express from "express";
import {
  getTasks,
  registerTask,
  getTasksCompleted,
  getTaskById,
  deleteTask,
  editTask,
} from "../controllers/tasksController.js";
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();
router.get("/completed", protectRoute, getTasksCompleted); ///http://localhost:5000/api/tasks/completed
router.get("/:id", protectRoute, getTaskById); ///http://localhost:5000/api/tasks/:id
router.put("/:id", protectRoute, editTask); ///http://localhost:5000/api/tasks/:id
router.get("/", protectRoute, getTasks); ///http://localhost:5000/api/tasks
router.delete("/:id", protectRoute, deleteTask); ///http://localhost:5000/api/tasks
router.post("/", protectRoute, registerTask); //http://localhost:5000/api/tasks
export default router;
