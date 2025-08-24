import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { type FC } from "react";
import Checkbox from "../Checkbox";

interface IProps {
  id: string;
  text: string;
  isCompleted: boolean;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  editTask: (id: string) => void;
}

const Task: FC<IProps> = ({
  id,
  text,
  isCompleted,
  toggleTask,
  removeTask,
  editTask,
}) => {
  return (
    <div className="flex justify-between items-center py-3 border-[rgba(108,99,255,.5)] not-first:border-t-1 group">
      <div className="flex items-center cursor-pointer">
        <Checkbox checked={isCompleted} onChange={() => toggleTask(id)} />
        <p
          className={`dark:text-[#f7f7f7] text-[20px] font-medium ml-4 transition-colors duration-250 ease-in-out break-all w-[600px] ${isCompleted ? "line-through text-[#8e8e8e]" : ""}`}
          onClick={() => toggleTask(id)}
        >
          {text}
        </p>
      </div>
      <div className="flex gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <button className="dark:text-[#f7f7f7] cursor-pointer">
          <EditOutlined className="text-medium" onClick={() => editTask(id)} />
        </button>
        <button
          className="dark:text-[#f7f7f7] cursor-pointer"
          onClick={() => removeTask(id)}
        >
          <DeleteOutlined className="text-medium" />
        </button>
      </div>
    </div>
  );
};

export default Task;
