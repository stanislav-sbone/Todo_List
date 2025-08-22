import { useEffect, useRef, useState, type FC } from "react";
import type { Sort } from "../../types";
import { ChevronDown } from "lucide-react";
import Option from "../Option";

interface IProps {
  sortValue: Sort;
  setSortValue: (value: Sort) => void;
}

const Dropdown: FC<IProps> = ({ sortValue, setSortValue }) => {
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const sortLabels: Record<Sort, string> = {
    ALL: "Все задачи",
    COMPLETED: "Выполненные",
    INCOMPLETED: "Не выполненные",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpenOptions(false);
      }
    };

    const handleEsc = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpenOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    };
  }, []);

  const handleClick = (value: Sort) => {
    setSortValue(value);
    setIsOpenOptions(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        className="absolute bg-[#6C63FF] text-[#F7F7F7] text-[16px] font-medium outline-none p-2 pl-3 rounded-[5px] cursor-pointer min-w-[180px] right-0 -top-4 text-left flex items-center justify-between"
        onClick={() => setIsOpenOptions(!isOpenOptions)}
      >
        {sortLabels[sortValue]}
        <ChevronDown
          className={`ml-2 w-4 h-4 transform transition-transform duration-200 ${
            isOpenOptions ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        className={` absolute bg-[#f7f7f7] text-[16px] font-medium text-[#6C63FF] border-[#6C63FF] border-[1px] rounded-[5px] w-[180px] right-0 top-6 transform transition-all duration-200 origin-top ${
          isOpenOptions
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        {Object.entries(sortLabels).map(([option, value]) => (
          <Option
            key={option}
            option={option}
            value={value}
            handleClick={handleClick}
            isActive={sortValue === option}
          />
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
