"use client";
import { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { StockType } from "@/utils/type";

const SideBar = ({
  category,
  setCategory,
  selectItem,
  setSelectItem,
}: {
  category: string;
  setCategory: (value: string) => void;
  selectItem: StockType | null;
  setSelectItem: Dispatch<SetStateAction<StockType | null>>;
}) => {
  return (
    <div className="w-[40px] h-[50vh] text-[12px] pt-[30px] ml-[2vw] text-center flex flex-col gap-5 justify-start shadow-[10px_0px_10px_-15px_rgba(0,0,0,0.3)] md:w-[80px] md:text-[14px] md:ml-[5vw] xl:text-[16px]">
      <p
        onClick={() => {
          setCategory("全部");
          setSelectItem(null);
        }}
        className={`text-themeGray-800 px-2 py-1 drop-shadow-sm md:py-3 hover:bg-themePink-300 hover:text-white hover:cursor-pointer hover:rounded-lg hover:font-medium ${
          category === "全部" && "text-themePink-600"
        }`}
      >
        全部
      </p>
      <p
        onClick={() => {
          setCategory("彩妝");
          setSelectItem(null);
        }}
        className={`text-themeGray-800 px-2 py-1 drop-shadow-sm md:py-3 hover:bg-themePink-300 hover:text-white hover:cursor-pointer hover:rounded-lg hover:font-medium ${
          category === "彩妝" && "text-themePink-600"
        }`}
      >
        彩妝
      </p>
      <p
        onClick={() => {
          setCategory("保養");
          setSelectItem(null);
        }}
        className={`text-themeGray-800 px-2 py-1 drop-shadow-sm md:py-3 hover:bg-themePink-300 hover:text-white hover:cursor-pointer hover:rounded-lg hover:font-medium ${
          category === "保養" && "text-themePink-600"
        }`}
      >
        保養
      </p>
      <p
        onClick={() => {
          setCategory("日用");
          setSelectItem(null);
        }}
        className={`text-themeGray-800 px-2 py-1 drop-shadow-sm md:py-3 hover:bg-themePink-300 hover:text-white hover:cursor-pointer hover:rounded-lg hover:font-medium ${
          category === "日用" && "text-themePink-600"
        }`}
      >
        日用
      </p>
      <p
        onClick={() => {
          setCategory("保健");
          setSelectItem(null);
        }}
        className={`text-themeGray-800 px-2 py-1 drop-shadow-sm md:py-3 hover:bg-themePink-300 hover:text-white hover:cursor-pointer hover:rounded-lg hover:font-medium ${
          category === "保健" && "text-themePink-600"
        }`}
      >
        保健
      </p>
      <p
        onClick={() => {
          setCategory("其他");
          setSelectItem(null);
        }}
        className={`text-themeGray-800 px-2 py-1 drop-shadow-sm md:py-3 hover:bg-themePink-300 hover:text-white hover:cursor-pointer hover:rounded-lg hover:font-medium ${
          category === "其他" && "text-themePink-600"
        }`}
      >
        其他
      </p>
    </div>
  );
};

export default SideBar;
