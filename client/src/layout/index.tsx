import { useEffect, useState, type FC } from "react";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TasksList";
import type { Sort, TaskType } from "../types";
import FilterForm from "../components/FilterForm";
import Dropdown from "../components/Dropdown";
import ThemeButton from "../components/ThemeButton";
import { createTask, getTasks } from "../components/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";

const Layout: FC = () => {
  const [sortedTasks, setSortedTasks] = useState<TaskType[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortValue, setSortValue] = useState<Sort>("ALL");

  const queryClient = useQueryClient();

  const { data: tasks = [] } = useQuery({
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
    switch (sortValue) {
      case "ALL":
        setSortedTasks([...tasks]);
        break;
      case "COMPLETED":
        setSortedTasks([...tasks.filter((task) => task.isCompleted)]);
        break;
      case "INCOMPLETED":
        setSortedTasks([...tasks.filter((task) => !task.isCompleted)]);
        break;
      default:
        setSortedTasks([...tasks]);
    }
  }, [tasks, sortValue]);

  const addTask = async (text: string) => {
    const newTask: TaskType = {
      id: nanoid(),
      text: text,
      isCompleted: false,
      isEditing: false,
    };
    addTaskMutation.mutate(newTask);
  };

  return (
    <div className="bg-[#f7f7f7] dark:bg-[#252525] flex items-center flex-col flex-1 min-w-[750px] transition-colors duration-500">
      <Header />
      <main className="w-[750px]">
        <TaskForm addTask={addTask} />
        <div className="flex justify-between items-center">
          <FilterForm
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
          <ThemeButton />
          <Dropdown sortValue={sortValue} setSortValue={setSortValue} />
        </div>
        <TaskList sortedTasks={sortedTasks} searchInput={searchInput} />
      </main>
    </div>
  );
};

export default Layout;
