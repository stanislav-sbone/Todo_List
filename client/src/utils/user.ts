import { nanoid } from "nanoid";
import { createTask } from "../services/api";

const initialTasks = [
  {
    id: nanoid(),
    text: "Сходить в магазин",
    isCompleted: false,
    isEditing: false,
  },
  {
    id: nanoid(),
    text: "Погулять с собакой",
    isCompleted: false,
    isEditing: false,
  },
  { id: nanoid(), text: "Сделать проект", isCompleted: true, isEditing: false },
];

export const getUserId = async (): Promise<string> => {
  let userId = localStorage.getItem("userId");

  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("userId", userId);

    // Создаём задачи на сервере, добавляя userId к каждой
    await Promise.all(initialTasks.map((task) => createTask(task)));
  }

  return userId;
};
