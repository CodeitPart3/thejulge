import { useState } from "react";

import { useNavigate } from "react-router-dom";

import SearchIcon from "@/assets/icon/search.svg";
export default function SearchInput() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-[28.125rem]">
      <img
        src={SearchIcon}
        alt="SearchIcon"
        className="absolute inset-y-2.5 left-3 flex items-center"
      />
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="pl-10 w-full h-[2.5rem] rounded-[0.625rem] p-[0.625rem] bg-gray-10 border border-transparent placeholder:text-gray-40 placeholder:text-sm"
        placeholder="가게 이름으로 찾아보세요"
      />
    </form>
  );
}
