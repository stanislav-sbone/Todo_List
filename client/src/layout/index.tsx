import { useEffect, useState, type FC } from "react";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TasksList";
import type { Sort, TaskType } from "../types";
import FilterForm from "../components/FilterForm";
import Dropdown from "../components/Dropdown";
import ThemeButton from "../components/ThemeButton";
import { createTask, getTasks } from "../components/services/api";

const Layout: FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [sortedTasks, setSortedTasks] = useState<TaskType[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortValue, setSortValue] = useState<Sort>("ALL");

  useEffect(() => {
    (async () => {
      const result = await getTasks();
      setTasks(result);
    })();
  }, []);

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
      id: tasks.length + 1,
      text: text,
      isCompleted: false,
      isEditing: false,
    };

    const response = await createTask(newTask);
    setTasks((prev) => [...prev, response]);
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
        <TaskList
          sortedTasks={sortedTasks}
          setTasks={setTasks}
          searchInput={searchInput}
        />
      </main>
    </div>
  );
};

export default Layout;
