"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { StockType } from "@/utils/type";
import StockDetails from "./StockDetails";
import add from "@/public/add-gray.png";

const Stock = ({ uid }: { uid: string }) => {
  const [category, setCategory] = useState("all");
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
            setStocks(res.data);
          }
        });
    };
    fetchStocks();
  }, [uid]);

  return (
    <div className="mb-[100px]">
      <div className="flex gap-4">
        <p
          onClick={() => {
            setCategory("all");
            setSelectItem(null);
          }}
        >
          全部
        </p>
        <p
          onClick={() => {
            setCategory("makeup");
            setSelectItem(null);
          }}
        >
          彩妝
        </p>
        <p
          onClick={() => {
            setCategory("beautyCare");
            setSelectItem(null);
          }}
        >
          保養
        </p>
        <p
          onClick={() => {
            setCategory("grocery");
            setSelectItem(null);
          }}
        >
          日用品
        </p>
        <p
          onClick={() => {
            setCategory("healthCare");
            setSelectItem(null);
          }}
        >
          醫療保健
        </p>
        <p
          onClick={() => {
            setCategory("other");
            setSelectItem(null);
          }}
        >
          其他
        </p>
      </div>

      <div className="grid gap-2 grid-cols-2">
        {!selectItem ? (
          stocks.map((stock) => (
            <Suspense fallback={<div>資料讀取中...</div>} key={stock.stockId}>
              <div
                className="bg-gray-50 border border-gray-200"
                onClick={() => setSelectItem(stock)}
              >
                <Image
                  src={`${stock.data.picture[0]}`}
                  alt=""
                  width={300}
                  height={300}
                />
                <p>類別：{stock.data.category}</p>
                <p>品牌：{stock.data.brand}</p>
                <p>品名：{stock.data.itemName}</p>
                <p>數量：{stock.data.amount}</p>
                <p>保存期限：{stock.data.expirationDate}</p>
                <p>剩餘時間：{stock.data.durationDay}天</p>
              </div>
            </Suspense>
          ))
        ) : (
          <StockDetails stock={selectItem} />
        )}
      </div>
      {!selectItem && (
        <Link href={`/main/${uid}/stock`}>
          <Image
            src={add}
            alt=""
            width={50}
            height={50}
            className="mx-auto mt-[30px]"
          />
        </Link>
      )}
    </div>
  );
};

export default Stock;
