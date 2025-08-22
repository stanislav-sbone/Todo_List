import { useEffect, useState, type FC } from "react";
import type { TaskType } from "../../types";
import Task from "../Task";
import EditTask from "../EditTask";
import { deleteTask, updateTask } from "../services/api";

interface IProps {
  sortedTasks: TaskType[];
  setTasks: (tasks: TaskType[]) => void;
  searchInput: string;
}

const TaskList: FC<IProps> = ({ sortedTasks, setTasks, searchInput }) => {
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    if (!searchInput) {
      setFilteredTasks([...sortedTasks]);
    }

    setFilteredTasks(
      sortedTasks.filter((task) =>
        task.text.toLowerCase().includes(searchInput.toLowerCase()),
      ),
    );
  }, [sortedTasks, searchInput]);

  const updateTaskLocal = (id: number, updatedFields: Partial<TaskType>) => {
    setTasks(
      sortedTasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task,
      ),
    );
  };

  const toggleTask = async (id: number) => {
    const task = sortedTasks.find((task) => task.id === id);
    if (!task) return;
    updateTaskLocal(id, { isCompleted: !task.isCompleted });
    updateTask(id, { isCompleted: !task.isCompleted });
  };

  const removeTask = async (id: number) => {
    const deletedTask = await deleteTask(id);
    if (deletedTask) {
      setTasks(sortedTasks.filter((task) => task.id !== id));
    }
  };

  const editTask = (id: number) => {
    updateTaskLocal(id, { isEditing: true });
    updateTask(id, { isEditing: true });
  };

  const editText = (text: string, id: number) => {
    updateTaskLocal(id, { text: text, isEditing: false });
    updateTask(id, { text: text, isEditing: false });
  };

  const cancelEdit = (id: number) => {
    updateTaskLocal(id, { isEditing: false });
    updateTask(id, { isEditing: false });
  };

  if (sortedTasks.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 py-12">
        <div className="w-[250px]">
          <img src="/cat.png" alt="cat" />
        </div>
        <div className=" text-[#6C63FF] dark:text-[#f7f7f7] text-xl font-medium">
          Список задач сейчас пуст
        </div>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-15">
        <div>
          <img src="/nomatch.png" alt="nomatches" />
        </div>
        <div className="text-[#6C63FF] dark:text-[#f7f7f7] text-xl font-medium mt-4">
          Совпадения не найдены
        </div>
      </div>
    );
  }

  return (
    <div className="my-4 w-[750px] max-w-[750px]">
      {filteredTasks
        .toReversed()
        .map((task) =>
          task.isEditing ? (
            <EditTask
              id={task.id}
              text={task.text}
              editText={editText}
              cancelEdit={cancelEdit}
            />
          ) : (
            <Task
              key={task.id}
              id={task.id}
              text={task.text}
              isCompleted={task.isCompleted}
              toggleTask={toggleTask}
              removeTask={removeTask}
              editTask={editTask}
            />
          ),
        )}
    </div>
  );
};

export default TaskList;
