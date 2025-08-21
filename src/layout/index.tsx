import { useEffect, useState, type FC } from 'react';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TasksList';
import type { Sort, TaskType } from '../types';
import FilterForm from '../components/FilterForm';
import Dropdown from '../components/Dropdown';

const Layout: FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [sortedTasks, setSortedTasks] = useState<TaskType[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [sortValue, setSortValue] = useState<Sort>('ALL');

  useEffect(() => {
    switch (sortValue) {
      case 'ALL':
        setSortedTasks([...tasks]);
        break;
      case 'COMPLETED':
        setSortedTasks([...tasks.filter((task) => task.isCompleted)]);
        break;
      case 'INCOMPLETED':
        setSortedTasks([...tasks.filter((task) => !task.isCompleted)]);
        break;
      default:
        setSortedTasks([...tasks]);
    }
  }, [tasks, sortValue]);

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
    <div className="bg-[#f7f7f7] flex items-center flex-col flex-1 min-w-[750px]">
      <Header />
      <main className="w-[750px]">
        <TaskForm addTask={addTask} />
        {tasks.length !== 0 && (
          <div className="flex justify-between items-center">
            <FilterForm
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
            <Dropdown sortValue={sortValue} setSortValue={setSortValue} />
          </div>
        )}
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
