"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { StockType } from "@/utils/type";
import SideBar from "@/components/main/stock/SideBar";
import StockDetails from "@/components/main/stock/StockDetails";
import StockSkeleton from "@/components/skeleton/StockSkeleton";

const Stock = ({ uid }: { uid: string }) => {
  const [category, setCategory] = useState("全部");
  const [fetchData, setFetchData] = useState<StockType[]>([]);
  const [stocks, setStocks] = useState<StockType[]>([]);
  const [selectItem, setSelectItem] = useState<StockType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true);
      await axios
        .get("/api/main/stock/current", {
          headers: { Authorization: `Bearer ${uid}` },
        })
        .then((res) => {
          if (res.status === 200) {
            const currentDate = new Date().getTime();
            const newData = res.data.map((data: StockType) => {
              const durationTime =
                new Date(data.data.expirationDate).getTime() - currentDate;
              const durationDay = Math.ceil(
                durationTime / (1000 * 60 * 60 * 24)
              );
              return {
                ...data,
                data: {
                  ...data.data,
                  durationDay: durationDay,
                },
              };
            });
            return newData.sort(
              (a: StockType, b: StockType) =>
                a.data.durationDay - b.data.durationDay
            );
          }
        })
        .then((res) => {
          setFetchData(res);
          setStocks(res);
          setLoading(false);
        });
    };
    fetchStocks();
  }, [uid]);

  useEffect(() => {
    if (category !== "全部") {
      setStocks(fetchData.filter((stock) => stock.data.category === category));
    } else {
      setStocks(fetchData);
    }
  }, [category, fetchData]);

  return (
    <div>
      <SideBar
        category={category}
        setCategory={setCategory}
        selectItem={selectItem}
        setSelectItem={setSelectItem}
        uid={uid}
      />

      <div className="w-[95vw] mx-auto flex flex-wrap justify-between md:w-[90vw] md:justify-start md:max-w-[1200px] md:gap-3 xl:gap-4 2xl:max-w-[1600px]">
        {loading ? (
          <StockSkeleton />
        ) : !selectItem && stocks.length === 0 ? (
          <div className="w-[100%] flex flex-col">
            <p className="text-center mt-[30px] mb-5 text-[14px] xl:text-[16px] xl:mt-[50px]">
              這個項目還是空的喔～
            </p>
          </div>
        ) : !selectItem ? (
          stocks.map((stock) => (
            <div
              key={stock.stockId}
              className="w-[calc(50%_-_4px)] my-1 rounded-lg shadow-lg cursor-pointer relative md:w-[calc(33%_-_15px)] xl:w-[calc(25%_-_15px)] 2xl:w-[calc(25%_-_15px)]"
              onClick={() => setSelectItem(stock)}
            >
              <div className="w-[100%] h-[170px] relative md:h-[250px] xl:h-[280px] 2xl:h-[350px]">
                <Image
                  src={`${stock.data.picture[0]}`}
                  alt="stock image"
                  fill
                  sizes="100%"
                  className="object-cover object-center rounded-t-lg drop-shadow-sm"
                />
              </div>

              <div className="px-[10px] py-[10px] text-[12px] md:flex md:justify-between xl:text-[14px]">
                <div>
                  <p className="px-[5px] py-[2px] bg-themePink-500 bg-opacity-80 text-white absolute top-0 left-0 xl:px-[8px] xl:py-[3px]">
                    {stock.data.category}
                  </p>
                  <p className="max-w-[100%] truncate text-[18px] font-semibold text-themePink-700 xl:text-[22px]">
                    {stock.data.brand}
                  </p>
                  <p className="max-w-[100%] truncate font-medium text-themePink-900 mb-1 xl:mb-2 xl:text-[16px]">
                    {stock.data.itemName}
                  </p>
                  <p>效期 | {stock.data.expirationDate}</p>
                  <p>數量 | {stock.data.amount}</p>
                </div>

                <div className="text-end flex justify-between items-baseline md:block">
                  <p className="text-themeGray-800 text-[8px]">剩餘時間</p>
                  <p>
                    <span
                      className={`font-medium text-[24px] xl:text-[32px] 2xl:text-[42px] ${
                        stock.data.durationDay && stock.data.durationDay < 30
                          ? " text-red-600"
                          : " text-themePink-400"
                      }`}
                    >
                      {stock.data.durationDay}
                    </span>
                    {""} 天
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <StockDetails stock={selectItem} />
        )}
      </div>
    </div>
  );
};

export default Stock;
