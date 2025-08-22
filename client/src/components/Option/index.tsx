import type { FC } from "react";
import type { Sort } from "../../types";

interface IProps {
  option: string;
  value: string;
  handleClick: (value: Sort) => void;
  isActive: boolean;
}

const Option: FC<IProps> = ({ option, value, handleClick, isActive }) => {
  return (
    <button
      className={`cursor-pointer text-left py-1 px-2 w-[100%] ${isActive ? "bg-[#d2d0f8] cursor-none" : "hover:bg-[#e5e4f8]"} `}
      onClick={() => handleClick(option as Sort)}
    >
      {value}
    </button>
  );
};

export default Option;
