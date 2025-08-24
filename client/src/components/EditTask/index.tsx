import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState, type FC, type FormEvent } from "react";

interface IProps {
  id: string;
  text: string;
  editText: (text: string, id: string) => void;
  cancelEdit: (id: string) => void;
}

const EditTask: FC<IProps> = ({ id, text, editText, cancelEdit }) => {
  const [editingText, setEditingText] = useState(text);
  const [isOpenMessage, setIsOpenMessage] = useState(false);
  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editRef.current?.focus();
  }, []);

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (editingText) {
      editText(editingText, id);
    } else {
      setIsOpenMessage(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingText(event.target.value);
    if (isOpenMessage) setIsOpenMessage(false);
  };

  return (
    <div
      className={`flex justify-between items-center py-3 border-[rgba(108,99,255,.5)] not-first:border-t-1`}
    >
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
              "dark:text-[#f7f7f7] relative text-[20px] font-medium ml-10 outline-none w-[230px] md:w-[630px] mr-9"
            }
            placeholder="Изменить задачу"
            value={editingText}
            onChange={handleChange}
            ref={editRef}
          />
        </div>
        {isOpenMessage && (
          <div className="absolute text-[11px] md:text-sm text-red-600 right-14">
            заполните поле
          </div>
        )}
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
