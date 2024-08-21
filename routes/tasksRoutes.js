import express from "express";
import {
  getTasks,
  registerTask,
  getTasksCompleted,
  getTaskById,
  deleteTask,
  editTask,
} from "../controllers/tasksController.js";
// import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();
router.get("/completed", getTasksCompleted); ///http://localhost:5000/api/tasks/completed
router.get("/:id", getTaskById); ///http://localhost:5000/api/tasks/:id
router.put("/:id", editTask); ///http://localhost:5000/api/tasks/:id
router.get("/", getTasks); ///http://localhost:5000/api/tasks
router.delete("/:id", deleteTask); ///http://localhost:5000/api/tasks
router.post("/", registerTask); //http://localhost:5000/api/tasks
export default router;
