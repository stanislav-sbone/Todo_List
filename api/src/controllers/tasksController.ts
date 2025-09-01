import type { Request, Response } from "express";
import { TASKS } from "../data/tasks.js";

export const getTasks = (req: Request, res: Response) => {
  const userId = (req.query.userId as string) || req.body.userId;
  const tasks = TASKS.filter((task) => task.userId === userId);
  res.json(tasks);
};

export const createTask = (req: Request, res: Response) => {
  const { newTask, userId } = req.body;
  if (!newTask || !userId) {
    return res.status(400).json({ error: "Нет задачи или userId" });
  }

  const task = { ...newTask, userId };
  TASKS.push(task);
  res.status(201).json(task);
};

export const deleteTask = (req: Request, res: Response) => {
  const id = req.params.id;
  const { userId } = req.body;

  const index = TASKS.findIndex(
    (task) => task.id === id && task.userId === userId,
  );
  if (index === -1) {
    return res.status(404).json({ message: "Задача не найдена" });
  }

  const deletedTask = TASKS.splice(index, 1)[0];
  res.json(deletedTask);
};

export const updateTask = (req: Request, res: Response) => {
  const id = req.params.id;
  const { updatedFields, userId } = req.body;

  const task = TASKS.find((t) => t.id === id && t.userId === userId);
  if (!task) {
    return res.status(404).json({ message: "Задача не найдена" });
  }

  Object.assign(task, updatedFields);

  res.status(201).json(task);
};
