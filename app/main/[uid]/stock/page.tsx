"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";
import AddPostImage from "@/components/create-post/AddPostImage";
import {
  makeupCategory,
  beautyCareCategory,
  groceryCategory,
  healthCareCategory,
} from "@/utils/subCategoryOfStocks";
import FinishAdd from "@/components/create-post/FinishAdd";
import back from "@/public/back.png";
const itemWrapper =
  "w-[90vw] mx-auto mt-[5px] mb-[10px] py-[5px] pl-[10px] flex gap-2";
const labelStyle = "w-[80px]";

const AddStock = () => {
  const user = useAppSelector((state) => state.user);
  const [stockImage, setStockImage] = useState<string[]>([]);
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [unit, setUnit] = useState<string>("ml");
  const [price, setPrice] = useState<string>("");
  const [purchasingDate, setPurchasingDate] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [used, setUsed] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [createStatus, setCreateStatus] = useState<boolean>(false);

  const addStock = () => {
    if (user.uid) {
      const stockDetails = {
        uid: user.uid,
        picture: stockImage,
        category: selectCategory,
        subCategory: subCategory,
        brand: brand,
        itemName: itemName,
        amount: amount,
        capacity: {
          itemCapacity: capacity,
          unit: unit,
        },
        price: price,
        purchasingDate: purchasingDate,
        expirationDate: expirationDate,
        used: used,
        note: note,
        createTime: null,
      };
      axios
        .post(
          "/api/main/stock/create",
          { stockDetails },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          if (response.status === 200) setCreateStatus(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <div className="w-[100vw] h-[50px] pt-[15px] px-[15px] mb-2 flex justify-between items-center fixed top-0 left-0 bg-white z-30">
        <Link href="../main">
          <Image src={back} alt="back to main page" width={25} height={25} />
        </Link>
      </div>
      <AddPostImage postImage={stockImage} setPostImage={setStockImage} />

      <form action="">
        <div className="w-[90vw] mx-auto mt-[20px] mb-[10px] py-[5px] pl-[10px] flex gap-2">
          {/* <Image src={category} alt="check auth icon" width={20}></Image> */}
          <select
            name=""
            id=""
            onChange={(e) => setSelectCategory(e.target.value)}
          >
            <option value="none">請選擇文章分類</option>
            <option value="彩妝">彩妝</option>
            <option value="保養">保養</option>
            <option value="日用品">日用品</option>
            <option value="醫療保健">醫療保健</option>
            <option value="其他">其他</option>
          </select>
        </div>

        <div className="w-[90vw] mx-auto mt-[20px] mb-[10px] py-[5px] pl-[10px] flex gap-2">
          {/* <Image src={category} alt="check auth icon" width={20}></Image> */}
          <select
            name=""
            id=""
            onChange={(e) => setSubCategory(e.target.value)}
          >
            {selectCategory === "makeup" ? (
              makeupCategory.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))
            ) : selectCategory === "beautyCare" ? (
              beautyCareCategory.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))
            ) : selectCategory === "grocery" ? (
              groceryCategory.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))
            ) : selectCategory === "healthCare" ? (
              healthCareCategory.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))
            ) : selectCategory === "beautyCare" ? (
              beautyCareCategory.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))
            ) : selectCategory === "other" ? (
              <option key="other" value="other">
                其他
              </option>
            ) : (
              <option value="none">請選擇產品種類</option>
            )}
          </select>
        </div>

        <div className={`${itemWrapper}`}>
          <label htmlFor="" className={`${labelStyle}`}>
            品牌
          </label>
          <input
            type="text"
            placeholder="請在此輸入..."
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div className={`${itemWrapper}`}>
          <label htmlFor="" className={`${labelStyle}`}>
            名稱
          </label>
          <input
            type="text"
            placeholder="請在此輸入..."
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>

        <div className={`${itemWrapper}`}>
          <label htmlFor="" className={`${labelStyle}`}>
            數量
          </label>
          <input
            type="number"
            placeholder="請在此輸入..."
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className={`${itemWrapper}`}>
          <label htmlFor="" className={`${labelStyle}`}>
            容量
          </label>
          <input
            type="number"
            placeholder="請在此輸入..."
            onChange={(e) => setCapacity(e.target.value)}
          />
          <select name="" id="" onChange={(e) => setUnit(e.target.value)}>
            <option value="none" disabled>
              請選擇
            </option>
            <option value="ml">毫升</option>
            <option value="g">公克</option>
          </select>
        </div>

        <div className={`${itemWrapper}`}>
          <label htmlFor="" className={`${labelStyle}`}>
            購買金額
          </label>
          <input
            type="number"
            placeholder="請在此輸入..."
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className={`${itemWrapper}`}>
          <label htmlFor="" className={`${labelStyle}`}>
            購買日期
          </label>
          <input
            type="date"
            placeholder="請在此輸入..."
            onChange={(e) => setPurchasingDate(e.target.value)}
          />
        </div>

        <div className={`${itemWrapper}`}>
          <label htmlFor="" className={`${labelStyle}`}>
            有效日期
          </label>
          <input
            type="date"
            placeholder="請在此輸入..."
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </div>

        <div className={`${itemWrapper}`}>
          <label htmlFor="" className={`${labelStyle}`}>
            是否開封
          </label>
          <select name="" id="" onChange={(e) => setUsed(e.target.value)}>
            <option value="none" disabled>
              請選擇
            </option>
            <option value="true">已開封</option>
            <option value="false">未開封</option>
          </select>
        </div>

        <div className={`${itemWrapper}`}>
          <label htmlFor="" className={`${labelStyle}`}>
            備註
          </label>
          <textarea
            rows={6}
            cols={40}
            placeholder="請在此輸入..."
            onChange={(e) => setNote(e.target.value)}
            className="w-[80vw] p-[10px] block border-[1px] border-gray-100"
          />
        </div>
      </form>

      <div className="w-[100vw] h-[50px] px-[20px] py-[30px] flex gap-[20px] justify-center items-center fixed bottom-0 bg-white">
        <div
          onClick={addStock}
          className="w-[100%] h-[40px] bg-red-500 flex items-center justify-center rounded-full text-white cursor-pointer"
        >
          增加一筆紀錄
        </div>
      </div>
      {createStatus && <FinishAdd />}
    </div>
  );
};

export default AddStock;
