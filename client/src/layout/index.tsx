import { useEffect, useState, type FC } from "react";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TasksList";
import type { Sort, TaskType } from "../types";
import FilterForm from "../components/FilterForm";
import Dropdown from "../components/Dropdown";
import ThemeButton from "../components/ThemeButton";
import { createTask, getTasks } from "../services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import Modal from "../components/Modal";
import OpenModalButton from "../components/OpenModalButton";

const Layout: FC = () => {
  const [sortedTasks, setSortedTasks] = useState<TaskType[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortValue, setSortValue] = useState<Sort>("ALL");
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: tasks = [], isPending } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    staleTime: 5 * 1000 * 60,
    refetchOnWindowFocus: false,
    retry: 3,
  });

  const addTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  useEffect(() => {
    const sortedByOrder = [...tasks].sort((a, b) => {
      const orderA = a.order ?? 0;
      const orderB = b.order ?? 0;
      return orderB - orderA; // Более высокий order идет первым
    });

    switch (sortValue) {
      case "ALL":
        setSortedTasks(sortedByOrder);
        break;
      case "COMPLETED":
        setSortedTasks([...sortedByOrder.filter((task) => task.isCompleted)]);
        break;
      case "INCOMPLETED":
        setSortedTasks([...sortedByOrder.filter((task) => !task.isCompleted)]);
        break;
      default:
        setSortedTasks(sortedByOrder);
    }
  }, [tasks, sortValue]);

  const addTask = async (text: string) => {
    const maxOrder =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.order ?? 0), 0) : 0;

    const newTask: TaskType = {
      id: nanoid(),
      text: text,
      isCompleted: false,
      isEditing: false,
      order: maxOrder + 1,
    };
    addTaskMutation.mutate(newTask);
  };

  return (
    <div className="w-[100%] bg-[#f7f7f7] dark:bg-[#252525] flex items-center flex-col flex-1 transition-colors duration-500">
      <Header />
      <main className="w-[350px] md:w-[750px]">
        <TaskForm addTask={addTask} />
        <OpenModalButton setIsOpen={() => setIsOpen(true)} />
        <div className="flex justify-between items-center flex-wrap">
          <FilterForm
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
          <ThemeButton />
          <Dropdown sortValue={sortValue} setSortValue={setSortValue} />
        </div>
        <TaskList
          sortedTasks={sortedTasks}
          searchInput={searchInput}
          isPending={isPending}
        />
      </main>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        addTask={addTask}
      />
    </div>
  );
};

export default Layout;
