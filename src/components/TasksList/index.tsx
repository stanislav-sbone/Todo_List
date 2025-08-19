import type { FC } from 'react';
import type { TaskType } from '../../types/task';
import Task from '../Task';

interface IProps {
  tasks: TaskType[];
  setTasks: (tasks: TaskType[]) => void;
}

const TaskList: FC<IProps> = ({ tasks, setTasks }) => {
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

  return (
    <div className="my-4 w-[750px] max-w-[750px]">
      {tasks.toReversed().map((task) => (
        <Task
          key={task.id}
          id={task.id}
          text={task.text}
          isCompleted={task.isCompleted}
          toggleTask={toggleTask}
          removeTask={removeTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
