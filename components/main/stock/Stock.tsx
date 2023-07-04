"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import sun from "@/public/main/sun.jpeg";
import add from "@/public/add-gray.png";

const Stock = ({ uid }: { uid: string }) => {
  const [category, setCategory] = useState("all");
  const [checkItem, setCheckItem] = useState("");
  return (
    <div className="mb-[100px]">
      <div className="flex gap-4">
        <p onClick={() => setCategory("all")}>全部</p>
        <p onClick={() => setCategory("makeup")}>彩妝</p>
        <p onClick={() => setCategory("beautyCare")}>保養</p>
        <p onClick={() => setCategory("grocery")}>日用品</p>
        <p onClick={() => setCategory("healthCare")}>醫療保健</p>
        <p onClick={() => setCategory("other")}>其他</p>
      </div>

      <div className="grid gap-2 grid-cols-2">
        <div className="bg-gray-50 border border-gray-200">
          <Image src={sun} alt="" />
          <p>類別：防曬乳</p>
          <p>品牌：雪肌精</p>
          <p>品名：保濕防曬凝膠</p>
          <p>數量：2</p>
          <p>保存期限：114.1.1</p>
          <p>剩餘時間：730天</p>
        </div>

        <div className="bg-gray-50 border border-gray-200">
          <Image src={sun} alt="" />
          <p>類別：防曬乳</p>
          <p>品牌：雪肌精</p>
          <p>品名：保濕防曬凝膠</p>
          <p>數量：2</p>
          <p>保存期限：114.1.1</p>
          <p>剩餘時間：730天</p>
        </div>
      </div>

      <Link href={`/main/${uid}/stock`}>
        <Image
          src={add}
          alt=""
          width={50}
          height={50}
          className="mx-auto mt-[30px]"
        />
      </Link>
    </div>
  );
};

export default Stock;
