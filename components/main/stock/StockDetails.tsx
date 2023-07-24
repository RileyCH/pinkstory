import React from "react";
import Image from "next/image";
import { StockType } from "@/utils/type";

const StockDetails = ({ stock }: { stock: StockType }) => {
  return (
    <div className="w-[95vw] mx-auto bg-white rounded-lg pb-3 relative drop-shadow md:max-w-[1200px] md:mt-[10px] md:flex md:justify-start md:gap-5 md:pb-0 xl:max-w-[1600px] xl:gap-8 2xl:gap-10">
      <div className="w-[100%] h-[350px] mb-3 flex overflow-x-auto relative shadow rounded-lg md:w-[45%] md:h-[450px] md:mb-0 xl:h-[500px] xl:w-[40%] 2xl:w-[35%] 2xl:h-[600px]">
        {stock.data.picture.length > 0 &&
          stock.data.picture.map((pic: string) => (
            <div
              key={pic}
              className={`w-[100%] h-[100%] relative flex-none rounded-t-lg`}
            >
              <Image
                src={pic}
                alt="stock image"
                sizes="100%"
                fill
                className="object-cover"
              />
            </div>
          ))}
        <p className="text-[12px] px-[5px] py-[2px] bg-themePink-500 text-white absolute top-0 left-0 xl:text-[14px] xl:px-[8px] xl:py-[3px]">
          {stock.data.category}
        </p>
      </div>

      <div className="flex mx-3 md:mt-[20px] relative md:static">
        <div className="w-[100%] px-[5px]">
          <p className="text-themePink-600 text-[24px] font-semibold break-words max-w-[60vw] xl:max-w-[500px] xl:text-[40px] xl:mb-1">
            {stock.data.brand}
          </p>
          <p className="text-themePink-800 font-bold break-words max-w-[60vw] xl:text-[24px] xl:max-w-[500px]">
            {stock.data.itemName}
          </p>
          <p className="text-themePink-950 text-[14px] mb-2 xl:mb-5 xl:text-[16px]">
            {stock.data.expirationDate} 到期
          </p>

          <div className="text-themeGray-800 text-[14px] mb-2 md:mb-3 xl:text-[16px]">
            <p className="mb-1 md:mb-2">用途：{stock.data.subCategory}</p>

            <p className="mb-1 md:mb-2">價格：${stock.data.price} 元</p>
            <p className="mb-1 md:mb-2">數量：{stock.data.amount}</p>
            {/* <p className="mb-1 md:mb-2">
              容量：{stock.data.capacity.itemCapacity}{" "}
              {stock.data.capacity.unit}
            </p> */}
            <p className="mb-1 md:mb-2">
              購買日：{stock.data.purchasingDate?.replaceAll("-", ".")}
            </p>
            <p className="mb-1 md:mb-2">
              是否開封：{stock.data.used === "true" ? "已開封" : "未開封"}
            </p>
            <p>備註：</p>
            {stock.data.note
              ? stock.data.note
                  .split("\n")
                  .map((note: string, index: number) => (
                    <span key={index}>
                      {note}
                      <br />
                    </span>
                  ))
              : "無"}
          </div>

          <p className="text-themeGray-600 text-[12px]">
            修改時間：
            {
              new Date(stock.data.createTime.seconds * 1000)
                .toLocaleString()
                .split(" ")[0]
            }
          </p>
        </div>
        <div className="absolute top-0 right-0 text-end md:top-[20px] md:right-10">
          <p className="text-themeGray-800 text-[14px] xl:text-[20px]">
            剩餘時間
          </p>

          <p
            className={`font-medium text-[24px] xl:text-[48px] 2xl:text-[60px] ${
              stock.data.durationDay && stock.data.durationDay < 30
                ? " text-red-600"
                : " text-themePink-400"
            }`}
          >
            {stock.data.durationDay} 天
          </p>
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
