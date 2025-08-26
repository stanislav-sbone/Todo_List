import { useEffect, useRef, useState, type FC, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  addTask: (text: string) => void;
}

const Modal: FC<IProps> = ({ isOpen, onClose, addTask }) => {
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (input.trim()) {
      addTask(input.trim());
      setInput("");
      onClose();
    }
  };

  const handleClose = () => {
    setInput("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex justify-center items-center bg-[rgb(0,0,0,0.4)] backdrop-blur-xs"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex flex-col bg-[#f7f7f7] dark:bg-[#252525] rounded-[10px] w-[350px] py-1 px-3"
            onClick={(event) => event.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-[#252525] dark:text-[#f7f7f7] text-2xl mt-1 ml-1">
                Новая задача
              </h2>
              <button
                className="text-3xl cursor-pointer dark:text-[#f7f7f7]"
                onClick={handleClose}
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={(event) => handleSubmit(event)}
              className="flex flex-col gap-2 ml-1 mt-2"
            >
              <input
                type="text"
                id="taskInput"
                ref={inputRef}
                className="justify-self-start text-[#6C63FF] dark:text-[#f7f7f7] border-[#6C63FF] dark:border-[#f7f7f7] text-[16px] font-medium border-1 rounded-[5px] w-[100%] py-2 px-10 focus:outline-[#6c63ff66] dark:focus:outline-[#f7f7f766] focus:outline-2"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Название задачи"
                autoComplete="off"
              />
              <div className="justify-end self-end flex gap-1 my-2">
                <button
                  className="text-[#f7f7f7] bg-[#6C63FF] font-medium py-2 px-4 rounded-[5px] cursor-pointer transition-colors duration-200 enabled:hover:bg-[#554df7] disabled:opacity-70 disabled:cursor-default"
                  disabled={!input.trim()}
                >
                  Создать
                </button>
                <button
                  className="text-[#f7f7f7] bg-[#6C63FF] font-medium py-2 px-4 rounded-[5px] cursor-pointer transition-colors duration-200 hover:bg-[#554df7]"
                  onClick={handleClose}
                >
                  Отмена
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
