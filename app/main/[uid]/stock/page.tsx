"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import dayjs from "dayjs";
import { useAppSelector } from "@/redux/hooks";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddPostImage from "@/components/create-post/AddPostImage";
import {
  makeupCategory,
  beautyCareCategory,
  groceryCategory,
  healthCareCategory,
} from "@/utils/subCategoryOfStocks";
import BackDiv from "@/components/BackDiv";
import ProductDate from "@/components/main/stock/ProductDate";
import FinishAdd from "@/components/create-post/FinishAdd";
const itemWrapper = "mb-2 flex gap-2 items-center md:mb-3";
const labelStyle = "w-[80px]";
const inputStyle =
  "w-[90vw] border border-themeGray-200 px-[10px] py-[5px] rounded-lg placeholder:text-[12px] md:placeholder:text-[14px] hover:border-themePink-400";

const AddStock = () => {
  const userStatus = useAppSelector((state) => state.user);
  const [stockImage, setStockImage] = useState<string[]>([]);
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [unit, setUnit] = useState<string>("ml");
  const [price, setPrice] = useState<string>("");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const formattedDate = `${currentYear}-${currentMonth}-${currentDay}`;
  const [purchasingDate, setPurchasingDate] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [used, setUsed] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [createStatus, setCreateStatus] = useState<boolean>(false);

  const addStock = () => {
    if (!stockImage) {
      window.alert("請新增產品照片");
    } else if (!selectCategory) {
      window.alert("請先選擇囤貨清單類別");
    } else if (!subCategory) {
      window.alert("請先選擇產品項目");
    } else if (!brand) {
      window.alert("請先輸入產品品牌");
    } else if (!itemName) {
      window.alert("請先輸入產品名稱");
    } else if (!amount) {
      window.alert("請先輸入產品數量");
    } else if (!used) {
      window.alert("請先確認是否已開封");
    } else if (!purchasingDate) {
      window.alert("請先選擇購買日期");
    } else if (!expirationDate) {
      window.alert("請先輸入到期日");
    }

    if (
      stockImage &&
      userStatus.uid &&
      selectCategory &&
      subCategory &&
      brand &&
      itemName &&
      amount &&
      used &&
      purchasingDate &&
      expirationDate
    ) {
      const stockDetails = {
        uid: userStatus.uid,
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="wrapper relative pb-[70px] pt-1 bg-themeGray-50 min-h-screen md:pt-[70px] md:pb-[20px]">
        <div className="w-[100vw] h-[50px] px-[15px] flex items-center fixed top-0 left-0 bg-white z-30 drop-shadow">
          <BackDiv url={`main/${userStatus.uid}`} />
        </div>

        <div className="md:bg-white md:w-[95vw] md:rounded-xl md:mx-auto md:py-[20px]">
          <p className="flex items-center font-semibold text-themePink-700 w-[90vw] pl-[12px] mx-auto relative before:w-1 before:h-4 before:absolute before:bg-themePink-400 before:top-1 before:left-0 before:rounded-md md:text-[18px] md:before:h-[20px] md:mb-4">
            新增囤貨清單
          </p>
          <AddPostImage postImage={stockImage} setPostImage={setStockImage} />

          <form className="w-[90vw] mx-auto text-[14px] placeholder:text-[14px] mt-6 pl-1">
            <div className="mb-2 md:flex md:justify-between md:items-center md:mb-5">
              <div>
                <label
                  htmlFor="mainCategory"
                  className="w-[80px] inline-block cursor-pointer"
                >
                  類別<span className="text-themePink-600">*</span>
                </label>
                <select
                  id="mainCategory"
                  onChange={(e) => setSelectCategory(e.target.value)}
                  className="w-[calc(45vw_-_100px)] text-[14px] px-1 py-1 border border-themeGray-200 rounded-md hover:border-themePink-400 cursor-pointer"
                >
                  <option value="彩妝">彩妝</option>
                  <option value="保養">保養</option>
                  <option value="日用">日用</option>
                  <option value="保健">保健</option>
                  <option value="其他">其他</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="subCategory"
                  className="w-[60px] inline-block cursor-pointer"
                >
                  產品<span className="text-themePink-600">*</span>
                </label>
                <select
                  id="subCategory"
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="w-[calc(45vw_-_100px)] text-[14px] px-1 py-1 border border-themeGray-200 rounded-md hover:border-themePink-400 cursor-pointer"
                >
                  {selectCategory === "彩妝" ? (
                    makeupCategory.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))
                  ) : selectCategory === "保養" ? (
                    beautyCareCategory.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))
                  ) : selectCategory === "日用" ? (
                    groceryCategory.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))
                  ) : selectCategory === "保健" ? (
                    healthCareCategory.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))
                  ) : selectCategory === "其他" ? (
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
                    <option value="none">請先選擇產品類別</option>
                  )}
                </select>
              </div>
            </div>

            <div className="mb-2 md:flex md:justify-between md:items-center md:mb-5">
              <div className="md:flex md:items-center">
                <label
                  htmlFor="brand"
                  className="w-[80px] inline-block cursor-pointer"
                >
                  品牌<span className="text-themePink-600">*</span>
                </label>
                <input
                  type="text"
                  id="brand"
                  placeholder="請在此輸入..."
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-[calc(45vw_-_100px)] border border-themeGray-200 px-[10px] py-[5px] rounded-lg placeholder:text-[12px] md:placeholder:text-[14px] hover:border-themePink-400"
                />
              </div>

              <div className="md:flex md:items-center">
                <label
                  htmlFor="productName"
                  className="w-[60px] inline-block cursor-pointer"
                >
                  名稱<span className="text-themePink-600">*</span>
                </label>
                <input
                  type="text"
                  id="productName"
                  placeholder="請在此輸入..."
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-[calc(45vw_-_100px)] border border-themeGray-200 px-[10px] py-[5px] rounded-lg placeholder:text-[12px] md:placeholder:text-[14px] hover:border-themePink-400 "
                />
              </div>
            </div>

            <div className="mb-2 md:flex md:justify-between md:items-center md:mb-5">
              <div className="md:flex md:items-center">
                <label
                  htmlFor="productAmount"
                  className="w-[80px] inline-block cursor-pointer"
                >
                  數量<span className="text-themePink-600">*</span>
                </label>
                <input
                  id="productAmount"
                  type="number"
                  placeholder="請在此輸入..."
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-[calc(45vw_-_100px)] border border-themeGray-200 px-[10px] py-[5px] rounded-lg placeholder:text-[12px] md:placeholder:text-[14px] hover:border-themePink-400"
                />
              </div>

              <div className="md:flex md:justify-start md:items-center">
                <label
                  htmlFor="productCapability"
                  className="w-[60px] inline-block cursor-pointer"
                >
                  容量
                </label>
                <input
                  id="productCapability"
                  type="number"
                  placeholder="請在此輸入..."
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-[calc(45vw_-_180px)]  border border-themeGray-200 px-[10px] py-[5px] rounded-lg placeholder:text-[12px] md:placeholder:text-[14px] hover:border-themePink-400"
                />
                <select
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-[69px] px-1 py-1 hover:rounded-md hover:border hover:border-themePink-400 cursor-pointer ml-2"
                >
                  <option value="ml">毫升</option>
                  <option value="g">公克</option>
                  <option value="pack">組</option>
                  <option value="other">其他</option>
                </select>
              </div>
            </div>

            <div className="mb-2 md:flex md:justify-between md:items-center md:mb-5">
              <div className="md:flex md:items-center">
                <label
                  htmlFor="purchasePrice"
                  className="w-[80px] inline-block cursor-pointer"
                >
                  購買金額
                </label>
                <input
                  id="purchasePrice"
                  type="number"
                  placeholder="請在此輸入..."
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-[calc(45vw_-_100px)] border border-themeGray-200 px-[10px] py-[5px] rounded-lg placeholder:text-[12px] md:placeholder:text-[14px] hover:border-themePink-400"
                />
              </div>

              <div className="w-[calc(45vw_-_43px)] md:flex md:items-center">
                <label className="w-[100px] cursor-pointer">
                  是否開封<span className="text-themePink-600">*</span>
                </label>
                <div
                  className="flex items-center mr-5"
                  onClick={() => setUsed("true")}
                >
                  <input
                    type="radio"
                    name="isUsed"
                    value="True"
                    id="isUsedTrue"
                    className="mr-[6px] hover:border hover:border-themePink-400"
                    defaultChecked
                  />
                  <label
                    htmlFor="isUsedTrue"
                    className="w-[60px] inline-block cursor-pointer hover:text-themePink-400"
                  >
                    已開封
                  </label>
                </div>

                <div
                  className="flex items-center"
                  onClick={() => setUsed("false")}
                >
                  <input
                    type="radio"
                    name="isUsed"
                    value="False"
                    id="isUsedFalse"
                    className="mr-[6px]"
                  />
                  <label
                    htmlFor="isUsedFalse"
                    className="w-[60px] inline-block cursor-pointer hover:text-themePink-400"
                  >
                    未開封
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-2 md:flex md:justify-between md:items-center md:mb-7">
              <div className="md:flex md:items-center">
                <label
                  htmlFor="expirationDate"
                  className="w-[80px] inline-block cursor-pointer"
                >
                  有效日期<span className="text-themePink-600">*</span>
                </label>
                <DatePicker
                  onChange={(e: any) => {
                    if (e.$y && e.$M && e.$D) {
                    }
                    setExpirationDate(`${e.$y}-${e.$M + 1}-${e.$D}`);
                  }}
                  label="請在此輸入..."
                  slotProps={{
                    textField: { size: "small" },
                  }}
                />
              </div>
              <div className="md:w-[calc(45vw_-_43px)] md:flex md:items-center">
                <label
                  htmlFor="purchasingDate"
                  className="w-[100px] inline-block cursor-pointer"
                >
                  購買日期<span className="text-themePink-600">*</span>
                </label>
                <DatePicker
                  onChange={(e: any) => {
                    if (e.$y && e.$M && e.$D) {
                    }
                    setPurchasingDate(`${e.$y}-${e.$M + 1}-${e.$D}`);
                  }}
                  label="請在此輸入..."
                  slotProps={{
                    textField: {
                      size: "small",
                      sx: {
                        fontSize: "10px",
                        borderColor: "#e6e6e6",
                        borderRadius: "999px",
                      },
                    },
                  }}
                />
              </div>
            </div>

            <div className="mb-2 md:flex md:justify-between md:mb-5 md:mt-3">
              <label
                htmlFor="note"
                className="w-[80px] inline-block cursor-pointer"
              >
                備註
              </label>
              <textarea
                id="note"
                rows={4}
                cols={20}
                placeholder="請在此輸入..."
                onChange={(e) => setNote(e.target.value)}
                className={`${inputStyle}`}
              />
            </div>
          </form>
          <div className="w-[100vw] h-[50px] px-[20px] py-[30px] flex gap-[20px] justify-center items-center fixed bottom-0 bg-white md:static md:w-[90vw] md:mx-auto md:justify-start md:px-0">
            <Link href={`/main/${userStatus.uid}`}>
              <p className="hidden md:w-[100px] md:h-[40px] md:rounded-lg md:border md:border-themeGray-400 md:text-themeGray-400 md:flex md:items-center md:justify-center md:hover:border-themeGray-800 md:hover:text-themeGray-80 md:cursor-pointer">
                取消
              </p>
            </Link>
            <p
              className="w-[95vw] h-[40px] bg-themePink-400 hover:bg-themePink-500 flex items-center justify-center rounded-full text-white cursor-pointer md:w-[100px] md:rounded-lg"
              onClick={addStock}
            >
              新增
            </p>
          </div>
        </div>

        {createStatus && <FinishAdd />}
      </div>
    </LocalizationProvider>
  );
};

export default AddStock;
