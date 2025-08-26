import type { FC } from "react";

interface IProps {
  setIsOpen: () => void;
}

const OpenModalButton: FC<IProps> = ({ setIsOpen }) => {
  return (
    <button
      className="md:hidden text-[#f7f7f7] bg-[#6C63FF] font-medium w-[100%] py-2 rounded-[5px] cursor-pointer order-3 "
      onClick={() => setIsOpen()}
    >
      Создать задачу
    </button>
  );
};

export default OpenModalButton;
