import { useEffect, useState, type FC } from "react";
import type { TaskType } from "../../types";
import Task from "../Task";
import EditTask from "../EditTask";
import { deleteTask, updateTask } from "../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IProps {
  sortedTasks: TaskType[];
  searchInput: string;
}

const TaskList: FC<IProps> = ({ sortedTasks, searchInput }) => {
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation({
    mutationFn: ({
      id,
      updatedFields,
    }: {
      id: number;
      updatedFields: Partial<TaskType>;
    }) => updateTask(id, updatedFields),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

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

  const toggleTask = async (id: number) => {
    const task = sortedTasks.find((task) => task.id === id);
    if (!task) return;
    updateTaskMutation.mutate({
      id,
      updatedFields: { isCompleted: !task.isCompleted },
    });
  };

  const removeTask = async (id: number) => {
    deleteTaskMutation.mutate(id);
  };

  const editTask = (id: number) => {
    updateTaskMutation.mutate({
      id,
      updatedFields: { isEditing: true },
    });
  };

  const editText = (text: string, id: number) => {
    updateTaskMutation.mutate({
      id,
      updatedFields: { text, isEditing: false },
    });
  };

  const cancelEdit = (id: number) => {
    updateTaskMutation.mutate({
      id,
      updatedFields: { isEditing: false },
    });
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
              key={task.id}
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
