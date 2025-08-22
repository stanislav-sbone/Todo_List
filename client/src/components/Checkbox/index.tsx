import { type FC } from "react";

interface IProps {
  checked: boolean;
  onChange: () => void;
}

const Checkbox: FC<IProps> = ({ checked, onChange }) => {
  return (
    <button
      onClick={onChange}
      className={`
        w-6 h-6 cursor-pointer flex items-center justify-center rounded-md border-1 transition-colors border-[#6c63ff]
        ${checked ? "bg-[#6c63ff]" : ""}
      `}
    >
      {checked && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.42 0l-3.25-3.25a1 1 0 111.42-1.42l2.54 2.54 6.54-6.54a1 1 0 011.42 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
};

export default Checkbox;
