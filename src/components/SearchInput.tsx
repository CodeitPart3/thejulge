import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Close } from "@/assets/icon";
import SearchIcon from "@/assets/icon/search.svg";
import { useFilterStore } from "@/store/useFilterStore";
export default function SearchInput() {
  const reset = useFilterStore((state) => state.reset);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    reset();
    navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
    setKeyword("");
  };

  const removeKeyword = () => {
    setKeyword("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex w-full md:max-w-[28.125rem] pl-10 rounded-[0.625rem] p-[0.625rem] bg-gray-10 border border-transparent"
    >
      <div className="flex items-center w-full">
        <img
          src={SearchIcon}
          alt="SearchIcon"
          className="absolute inset-y-2.5 left-3 flex items-center"
        />
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full placeholder:text-gray-40 text-sm outline-none"
          placeholder="가게 이름으로 찾아보세요"
        />
      </div>
      {keyword.length > 0 && (
        <button
          type="button"
          className="cursor-pointer"
          onClick={removeKeyword}
        >
          <Close className="w-5 h-5" />
        </button>
      )}
    </form>
  );
}
