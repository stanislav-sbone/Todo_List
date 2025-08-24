/* eslint-disable no-console */
import axios from "axios";
import type { TaskType } from "../../types";
import { URL } from "../../constants";

export const getTasks = async (): Promise<TaskType[]> => {
  try {
    const response = await axios.get<TaskType[]>(URL);
    return response.data;
  } catch (error) {
    console.error(`Ошибка ${error}`);
    return [];
  }
};

export const createTask = async (newTask: TaskType) => {
  try {
    const response = await axios.post(URL, newTask);
    return response.data;
  } catch (error) {
    console.error(`Ошибка ${error}`);
  }
};

export const deleteTask = async (id: number) => {
  try {
    const response = await axios.delete(`${URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка ${error}`);
  }
};

export const updateTask = async (
  id: number,
  updatedFields: Partial<TaskType>,
) => {
  try {
    const response = await axios.patch(`${URL}/${id}`, updatedFields);
    return response.data;
  } catch (error) {
    console.error(`Ошибка ${error}`);
  }
};
