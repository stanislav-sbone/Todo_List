/* eslint-disable no-console */
import axios from "axios";
import type { TaskType } from "../types";
import { URL } from "../constants";
import { getUserId } from "../utils/user";

export const getTasks = async (): Promise<TaskType[]> => {
  try {
    const userId = await getUserId();
    const response = await axios.get<TaskType[]>(`${URL}?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка ${error}`);
    return [];
  }
};

export const createTask = async (newTask: TaskType) => {
  try {
    const userId = await getUserId();
    const response = await axios.post(URL, { newTask, userId });
    return response.data;
  } catch (error) {
    console.error(`Ошибка ${error}`);
  }
};

export const deleteTask = async (id: string) => {
  try {
    const userId = await getUserId();
    const response = await axios.delete(`${URL}/${id}`, { data: { userId } });
    return response.data;
  } catch (error) {
    console.error(`Ошибка ${error}`);
  }
};

export const updateTask = async (
  id: string,
  updatedFields: Partial<TaskType>,
) => {
  try {
    const userId = await getUserId();
    const response = await axios.patch(`${URL}/${id}`, {
      updatedFields,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error(`Ошибка ${error}`);
  }
};

export const updateTasksOrder = async (tasks: TaskType[]) => {
  try {
    const userId = await getUserId();
    const response = await axios.post(`${URL}/reorder`, {
      tasks,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error(`Ошибка ${error}`);
  }
};
