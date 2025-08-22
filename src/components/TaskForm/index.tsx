import { useState, type FC, type FormEvent } from 'react';

interface IProps {
  addTask: (input: string) => void;
}

const TaskForm: FC<IProps> = ({ addTask }) => {
  const [input, setInput] = useState<string>('');

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (input.trim()) {
      addTask(input.trim());
      setInput('');
    }
  };

  return (
    <form className="flex gap-4" onSubmit={(event) => handleSubmit(event)}>
      <input
        type="text"
        className="text-[#6C63FF] dark:text-[#f7f7f7] border-[#6C63FF] dark:border-[#f7f7f7] text-[16px] font-medium border-1 rounded-[5px] w-[100%] py-2 px-10 focus:outline-[#6c63ff66] dark:focus:outline-[#f7f7f766] focus:outline-2"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Добавить задачу"
      />
      <button
        className="text-[#f7f7f7] bg-[#6C63FF] font-medium py-2 px-4 rounded-[5px] cursor-pointer disabled:opacity-70 disabled:cursor-default"
        type="submit"
        disabled={!input.trim()}
      >
        Создать
      </button>
    </form>
  );
};

export default TaskForm;
