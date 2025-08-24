import { nanoid } from "nanoid";

export const TASKS = [
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
  {
    id: nanoid(),
    text: "Сделать проект",
    isCompleted: false,
    isEditing: false,
  },
];
