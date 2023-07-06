import React from "react";
import Image from "next/image";
import { StockType } from "@/utils/type";

const StockDetails = ({ stock }: { stock: StockType }) => {
  return (
    <div className="col-start-1 col-end-3">
      <div className="w-[100vw] mx-auto flex overflow-x-auto">
        {stock.data.picture.length > 0 &&
          stock.data.picture.map((pic: string) => (
            <div key={pic} className={`w-[400px] h-[400px] relative flex-none`}>
              <Image src={pic} alt="" fill />
            </div>
          ))}
      </div>

      <p>類別：{stock.data.category}</p>
      <p>用途：{stock.data.subCategory}</p>
      <p>品牌：{stock.data.brand}</p>
      <p>名稱：{stock.data.itemName}</p>
      <p>數量：{stock.data.amount}</p>
      <p>名稱：{stock.data.itemName}</p>
      <p>
        容量：{stock.data.capacity.itemCapacity} {stock.data.capacity.unit}
      </p>
      <p>價格：{stock.data.price} 元</p>
      <p>購買日：{stock.data.purchasingDate}</p>
      <p>到期日：{stock.data.expirationDate}</p>
      <p>剩餘使用時間：{stock.data.durationDay} 天</p>
      <p>是否開封：{stock.data.used === "true" ? "已開封" : "未開封"}</p>
      <p>
        備註：
        {stock.data.note &&
          stock.data.note.split("\n").map((note: string, index: number) => (
            <p key={index}>
              {note}
              <br />
            </p>
          ))}
      </p>
      <p>{new Date(stock.data.createTime.seconds * 1000).toLocaleString()}</p>
    </div>
  );
};

export default StockDetails;
