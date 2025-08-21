import type { FC } from 'react';
import type { TaskType } from '../../types/task';
import Task from '../Task';
import EditTask from '../EditTask';

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

  const editTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, isCompleted: false, isEditing: true }
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
      {tasks
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
