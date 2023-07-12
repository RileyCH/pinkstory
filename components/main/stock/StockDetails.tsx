import React from "react";
import Image from "next/image";
import { StockType } from "@/utils/type";

const StockDetails = ({ stock }: { stock: StockType }) => {
  return (
    <div className="max-w-[1100px] md:ml-[50px] md:mt-[10px] md:flex md:justify-start md:gap-[50px] relative">
      <div className="mx-auto flex overflow-x-auto relative border border-gray-300 shadow-lg rounded-lg">
        {stock.data.picture.length > 0 &&
          stock.data.picture.map((pic: string) => (
            <div
              key={pic}
              className={`w-[400px] h-[400px] relative flex-none rounded-lg`}
            >
              <Image src={pic} alt="stock image" fill className="rounded-lg" />
            </div>
          ))}
        <p className="px-[5px] py-[2px] bg-themePink-500 text-white absolute top-0 left-0 xl:px-[8px] xl:py-[3px]">
          {stock.data.category}
        </p>
      </div>

      <div>
        <p className="text-themePink-600 xl:text-[30px] xl:font-semibold xl:mb-3">
          {stock.data.brand}
        </p>
        <p className="text-themeGray-800 xl:mb-1">
          名稱：{stock.data.itemName}
        </p>
        <p className="text-themeGray-800 xl:mb-1">
          用途：{stock.data.subCategory}
        </p>

        <p className="text-themeGray-800 xl:mb-1">
          容量：{stock.data.capacity.itemCapacity} {stock.data.capacity.unit}
        </p>
        <p className="text-themeGray-800 xl:mb-1">
          價格：${stock.data.price} 元
        </p>
        <p className="text-themeGray-800 xl:mb-1">數量：{stock.data.amount}</p>
        <p className="text-themeGray-800 xl:mb-1">
          購買日：{stock.data.purchasingDate?.replaceAll("-", " / ")}
        </p>
        <p className="text-themeGray-800 xl:mb-1">
          到期日：{stock.data.expirationDate?.replaceAll("-", " / ")}
        </p>
        <p className="text-themeGray-800 xl:mb-1">
          剩餘使用時間：{stock.data.durationDay} 天
        </p>
        <p className="text-themeGray-800 xl:mb-1">
          是否開封：{stock.data.used === "true" ? "已開封" : "未開封"}
        </p>
        <div className="text-themeGray-800 xl:mb-1">
          <span>備註：</span>
          {stock.data.note
            ? stock.data.note.split("\n").map((note: string, index: number) => (
                <span key={index}>
                  {note}
                  <br />
                </span>
              ))
            : "無"}
        </div>
        <p className="text-themeGray-600 text-[12px] absolute bottom-4">
          修改時間：
          {
            new Date(stock.data.createTime.seconds * 1000)
              .toLocaleString()
              .split(" ")[0]
          }
        </p>
      </div>
    </div>
  );
};

export default StockDetails;
