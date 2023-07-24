"use client";
import { Dispatch, SetStateAction } from "react";
import AddStock from "@/components/main/stock/AddStock";
import { StockType } from "@/utils/type";

const SideBar = ({
  category,
  setCategory,
  selectItem,
  setSelectItem,
  uid,
}: {
  category: string;
  setCategory: (value: string) => void;
  selectItem: StockType | null;
  setSelectItem: Dispatch<SetStateAction<StockType | null>>;
  uid: string;
}) => {
  return (
    <div className="w-[95vw] mx-auto mb-[5px] md:px-1 flex gap-[20px] items-center md:w-[85vw] md:max-w-[1200px] md:my-[10px] xl:max-w-[1600px]">
      <div className="flex gap-2 text-[12px] text-center md:text-[14px] xl:text-[16px] ">
        <p
          onClick={() => {
            setCategory("全部");
            setSelectItem(null);
          }}
          className={`text-themeGray-800 px-2 py-1  hover:bg-themePink-300 hover:text-white hover:cursor-pointer hover:rounded-lg hover:font-medium ${
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
          className={`text-themeGray-800 px-2 py-1  hover:bg-themePink-300 hover:text-white hover:cursor-pointer hover:rounded-lg hover:font-medium ${
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
          className={`text-themeGray-800 px-2 py-1 hover:bg-themePink-300 hover:text-white hover:cursor-pointer hover:rounded-lg hover:font-medium ${
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
          className={`text-themeGray-800 px-2 py-1 hover:bg-themePink-300 hover:text-white hover:cursor-pointer hover:rounded-lg hover:font-medium ${
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
          className={`text-themeGray-800 px-2 py-1 hover:bg-themePink-300 hover:text-white hover:cursor-pointer hover:rounded-lg hover:font-medium ${
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
          className={`text-themeGray-800 px-2 py-1 hover:bg-themePink-300 hover:text-white hover:cursor-pointer hover:rounded-lg hover:font-medium ${
            category === "其他" && "text-themePink-600"
          }`}
        >
          其他
        </p>
      </div>

      <AddStock uid={uid} />
    </div>
  );
};

export default SideBar;
