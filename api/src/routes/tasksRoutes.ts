import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/tasksController.js";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.delete("/:id", deleteTask);
router.patch("/:id", updateTask);

export default router;
