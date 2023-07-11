import React from "react";
import Image from "next/image";
import search from "@/public/post/search.png";

const SearchBar = () => {
  return (
    <div>
      <form className="w-[90vw] mx-auto my-[10px] flex gap-4 items-center relative">
        <div className="w-[20px] h-[20px] absolute left-4">
          <Image src={search} alt="search bar" fill />
        </div>
        <input
          type="text"
          placeholder="搜尋文章..."
          className="w-[88vw] mx-auto bg-white bg-opacity-40 py-[5px] pl-[40px] rounded-full placeholder:text-white"
        />
      </form>
    </div>
  );
};

export default SearchBar;
