"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { StockType } from "@/utils/type";
import SideBar from "@/components/main/stock/SideBar";
import StockDetails from "./StockDetails";
import add from "@/public/add-gray.png";

const Stock = ({ uid }: { uid: string }) => {
  const [category, setCategory] = useState("全部");
  const [fetchData, setFetchData] = useState<StockType[]>([]);
  const [stocks, setStocks] = useState<StockType[]>([]);
  const [selectItem, setSelectItem] = useState<StockType | null>(null);

  useEffect(() => {
    const fetchStocks = async () => {
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
            return newData;
          }
        })
        .then((res) => {
          setFetchData(res);
          setStocks(res);
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
    <div className="max-w-[1200px] mx-auto px-5 flex gap-4">
      <SideBar
        category={category}
        setCategory={setCategory}
        selectItem={selectItem}
        setSelectItem={setSelectItem}
      />
      <div>
        <div className="max-w-[1200px] mx-auto flex flex-wrap justify-between items-center md:flex md:gap-3 xl:gap-4">
          {!selectItem ? (
            stocks.map((stock) => (
              <Suspense
                fallback={<div className="w-[50vw] mx-auto">資料讀取中...</div>}
                key={stock.stockId}
              >
                <div
                  className="my-1 rounded-lg shadow-lg cursor-pointer border border-gray-200 relative"
                  onClick={() => setSelectItem(stock)}
                >
                  <div className="w-[47vw] h-[170px] relative md:w-[29vw] md:h-[250px] xl:w-[20vw] xl:h-[300px]">
                    <Image
                      src={`${stock.data.picture[0]}`}
                      alt=""
                      fill
                      className="object-cover object-center rounded-t-lg drop-shadow-sm"
                    />
                  </div>

                  <div className="px-[20px] py-[10px] text-[12px] flex justify-between xl:text-[14px]">
                    <div>
                      <p className="px-[5px] py-[2px] bg-themePink-500 text-white absolute top-0 left-0 xl:px-[8px] xl:py-[3px]">
                        {stock.data.category}
                      </p>
                      <p>品牌：{stock.data.brand}</p>
                      <p>品名：{stock.data.itemName}</p>
                      <p>數量：{stock.data.amount}</p>
                      <p>效期：{stock.data.expirationDate}</p>
                    </div>

                    <div className="text-end">
                      <p className="text-themeGray-800 text-[8px]">剩餘時間</p>
                      <p>
                        <span
                          className={`text-[20px] xl:text-[34px] font-medium ${
                            stock.data.durationDay &&
                            stock.data.durationDay < 30
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
              </Suspense>
            ))
          ) : (
            <StockDetails stock={selectItem} />
          )}

          {!selectItem && (
            <Link
              href={`/main/${uid}/stock`}
              className="bg-themePink-400 p-4 fixed right-[120px] bottom-[70px] rounded-full"
            >
              <div className="w-[20px] h-[20px] relative">
                <Image src={add} alt="add new stock" fill />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stock;
