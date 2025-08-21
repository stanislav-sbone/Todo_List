import { useState, type FC } from 'react';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TasksList';
import type { TaskType } from '../types/task';
import FilterForm from '../components/FilterForm';

const Layout: FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [searchInput, setSearchInput] = useState('');

  const addTask = (text: string) => {
    const newTask = {
      id: Date.now(),
      text: text,
      isCompleted: false,
      isEditing: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div className="bg-[#f7f7f7] flex items-center flex-col flex-1">
      <Header />
      <main>
        <TaskForm addTask={addTask} />
        <FilterForm searchInput={searchInput} setSearchInput={setSearchInput} />
        <TaskList tasks={tasks} setTasks={setTasks} searchInput={searchInput} />
      </main>
    </div>
  );
};

export default Layout;
