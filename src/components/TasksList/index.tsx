import { useEffect, useState, type FC } from 'react';
import type { TaskType } from '../../types/task';
import Task from '../Task';
import EditTask from '../EditTask';

interface IProps {
  tasks: TaskType[];
  setTasks: (tasks: TaskType[]) => void;
  searchInput: string;
}

const TaskList: FC<IProps> = ({ tasks, setTasks, searchInput }) => {
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    if (!searchInput) {
      setFilteredTasks([...tasks]);
    }

    setFilteredTasks(
      tasks.filter((task) =>
        task.text.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [tasks, searchInput]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, isEditing: true }
          : { ...task, isEditing: false }
      )
    );
  };

  const editText = (text: string, id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: text, isEditing: false } : task
      )
    );
  };

  const cancelEdit = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: false } : task
      )
    );
  };

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
          )
        )}
    </div>
  );
};

export default TaskList;
