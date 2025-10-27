import { useEffect, useState, type FC } from "react";
import type { TaskType } from "../../types";
import Task from "../Task";
import EditTask from "../EditTask";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask, updateTask, updateTasksOrder } from "../../services/api";

interface IProps {
  sortedTasks: TaskType[];
  searchInput: string;
  isPending: boolean;
}

const TaskList: FC<IProps> = ({ sortedTasks, searchInput, isPending }) => {
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation({
    mutationFn: ({
      id,
      updatedFields,
    }: {
      id: string;
      updatedFields: Partial<TaskType>;
    }) => updateTask(id, updatedFields),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateTasksOrderMutation = useMutation({
    mutationFn: (tasks: TaskType[]) => updateTasksOrder(tasks),
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

  const toggleTask = async (id: string) => {
    const task = sortedTasks.find((task) => task.id === id);
    if (!task) return;
    updateTaskMutation.mutate({
      id,
      updatedFields: { isCompleted: !task.isCompleted },
    });
  };

  const removeTask = async (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  const editTask = (id: string) => {
    updateTaskMutation.mutate({
      id,
      updatedFields: { isEditing: true },
    });
  };

  const editText = (text: string, id: string) => {
    updateTaskMutation.mutate({
      id,
      updatedFields: { text, isEditing: false },
    });
  };

  const cancelEdit = (id: string) => {
    updateTaskMutation.mutate({
      id,
      updatedFields: { isEditing: false },
    });
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    setDraggedTask(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    if (!draggedTask || draggedTask === targetId) return;

    const taskIndex = filteredTasks.findIndex((t) => t.id === targetId);
    const draggedIndex = filteredTasks.findIndex((t) => t.id === draggedTask);

    if (taskIndex === -1 || draggedIndex === -1) return;

    // Находим индексы в полном списке sortedTasks
    const allTaskIndex = sortedTasks.findIndex((t) => t.id === targetId);
    const allDraggedIndex = sortedTasks.findIndex((t) => t.id === draggedTask);

    if (allTaskIndex === -1 || allDraggedIndex === -1) return;

    // Перемещаем в полном списке
    const newAllTasks = [...sortedTasks];
    const [removed] = newAllTasks.splice(allDraggedIndex, 1);
    newAllTasks.splice(allTaskIndex, 0, removed);

    // Обновляем порядок для всех задач
    const updatedTasks = newAllTasks.map((task, index) => ({
      ...task,
      order: newAllTasks.length - index,
    }));

    // Отправляем обновление на сервер
    updateTasksOrderMutation.mutate(updatedTasks);
    setDraggedTask(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  if (isPending) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 py-12 h-75">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-[#6C63FF]/30 border-t-[#6C63FF] animate-spin"></div>
        </div>
        <div className=" text-[#6C63FF] dark:text-[#f7f7f7] text-xl font-medium">
          Идет загрузка задач...
        </div>
      </div>
    );
  }

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
    <div className="my-4 w-[350px] md:w-[750px] md:max-w-[750px]">
      {filteredTasks.toReversed().map((task) =>
        task.isEditing ? (
          <EditTask
            key={task.id}
            id={task.id}
            text={task.text}
            editText={editText}
            cancelEdit={cancelEdit}
          />
        ) : (
          <div
            key={task.id}
            draggable={!searchInput}
            onDragStart={(e) => handleDragStart(e, task.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, task.id)}
            onDragEnd={handleDragEnd}
            className={draggedTask === task.id ? "opacity-50" : ""}
          >
            <Task
              id={task.id}
              text={task.text}
              isCompleted={task.isCompleted}
              toggleTask={toggleTask}
              removeTask={removeTask}
              editTask={editTask}
              isDragging={draggedTask === task.id}
            />
          </div>
        ),
      )}
    </div>
  );
};

export default TaskList;
