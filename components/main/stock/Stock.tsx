"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { StockType } from "@/utils/type";
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
            setFetchData(res.data);
            setStocks(res.data);
          }
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
  }, [category]);

  return (
    <div className="max-w-[1200px] mx-auto px-5 flex gap-4">
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
                        <span className="text-[20px] text-themePink-400 xl:text-[40px] font-medium">
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
            <Link href={`/main/${uid}/stock`}>
              <div className="w-[20px] h-[20px] ml-[40px] relative">
                <Image src={add} alt="" fill />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stock;
