import type { Request, Response } from "express";
import { TASKS } from "../data/tasks.ts";

export const getTasks = (req: Request, res: Response) => {
  res.json(TASKS);
};

export const createTask = (req: Request, res: Response) => {
  const newTask = req.body;
  TASKS.push(newTask);
  res.status(201).json(newTask);
};

export const deleteTask = (req: Request, res: Response) => {
  const id = req.params.id;

  const index = TASKS.findIndex((task) => task.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Задача не найдена" });
  }

  const deletedTask = TASKS.splice(index, 1)[0];
  res.json(deletedTask);
};

export const updateTask = (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedFields = req.body;

  const task = TASKS.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ message: "Задача не найдена" });
  }

  Object.assign(task, updatedFields);

  res.status(201).json(task);
};
