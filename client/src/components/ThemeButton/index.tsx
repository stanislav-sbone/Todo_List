import type { FC } from "react";
import { useTheme } from "../../ThemeContext";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

const ThemeButton: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative mt-2 md:m-0 order-2 md:order-0">
      <button
        className="md:absolute bg-[#6C63FF] text-[#F7F7F7] text-[16px] font-medium outline-none p-2.5 rounded-[5px] cursor-pointer right-17.5 -top-4 text-left flex items-center justify-between transition-colors duration-300 ease-in-out hover:bg-[#4944b8]"
        onClick={() => toggleTheme()}
      >
        {theme === "light" ? (
          <SunOutlined className={"text-xl"} />
        ) : (
          <MoonOutlined className={"text-xl"} />
        )}
      </button>
    </div>
  );
};

export default ThemeButton;
