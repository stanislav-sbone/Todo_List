import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { type Dispatch, type FC, type SetStateAction } from 'react';

interface IProps {
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
}

const FilterForm: FC<IProps> = ({ searchInput, setSearchInput }) => {
  const clearInput = () => {
    setSearchInput('');
  };

  return (
    <div className="mt-2 relative">
      <div className="absolute text-[#6C63FF] top-3 left-3">
        <SearchOutlined className="text-xl" />
      </div>
      <input
        type="text"
        placeholder="Поиск задачи"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        className="relative text-[#6C63FF] border-[#6C63FF] text-[16px] font-medium border-1 rounded-[5px] w-[550px] py-2 px-10 focus:outline-[#6c63ff66] focus:outline-3"
      />
      {searchInput && (
        <button
          className="absolute text-[#6C63FF] right-4 top-2.5 cursor-pointer"
          onClick={() => clearInput()}
        >
          <CloseOutlined />
        </button>
      )}
    </div>
  );
};

export default FilterForm;
