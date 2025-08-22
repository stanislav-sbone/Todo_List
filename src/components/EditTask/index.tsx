import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState, type FC, type FormEvent } from 'react';

interface IProps {
  id: number;
  text: string;
  editText: (text: string, id: number) => void;
  cancelEdit: (id: number) => void;
}

const EditTask: FC<IProps> = ({ id, text, editText, cancelEdit }) => {
  const [editingText, setEditingText] = useState(text);
  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editRef.current?.focus();
  }, []);

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    editText(editingText, id);
  };

  return (
    <div className="flex justify-between items-center py-3 border-[rgba(108,99,255,.5)] not-first:border-t-1">
      <form
        className="flex items-center relative"
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className="absolute text-[#6C63FF] top-1">
          <EditOutlined className="text-xl " />
        </div>
        <div>
          <input
            className={
              'dark:text-[#f7f7f7] realtive text-[20px] font-medium ml-10 outline-none w-[630px] mr-9'
            }
            placeholder="Изменить задачу"
            value={editingText}
            onChange={(event) => setEditingText(event.target.value)}
            ref={editRef}
          />
        </div>
        <div className="flex gap-2.5">
          <button className="dark:text-[#f7f7f7]" type="submit">
            <CheckOutlined className="text-medium cursor-pointer" />
          </button>
          <button
            className="dark:text-[#f7f7f7]"
            type="button"
            onClick={() => cancelEdit(id)}
          >
            <CloseOutlined className="text-medium cursor-pointer" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
