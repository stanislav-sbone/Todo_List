import { DeleteOutlined } from '@ant-design/icons';
import type { FC } from 'react';
import Checkbox from '../Checkbox';

interface IProps {
  id: number;
  text: string;
  isCompleted: boolean;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
}

const Task: FC<IProps> = ({
  id,
  text,
  isCompleted,
  toggleTask,
  removeTask,
}) => {
  return (
    <div className="flex justify-between items-center py-3 border-[rgba(108,99,255,.5)] not-first:border-t-1">
      <div className="flex items-center">
        <Checkbox checked={isCompleted} onChange={() => toggleTask(id)} />
        <p
          className={`text-[20px] font-medium ml-4 pr-10 transition-colors duration-250 ease-in-out break-all w-[700px] ${isCompleted ? 'line-through text-[#8e8e8e]' : ''}`}
          onClick={() => toggleTask(id)}
        >
          {text}
        </p>
      </div>
      <div>
        <button className="cursor-pointer" onClick={() => removeTask(id)}>
          <DeleteOutlined />
        </button>
      </div>
    </div>
  );
};

export default Task;
