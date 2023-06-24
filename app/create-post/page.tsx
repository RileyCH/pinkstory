"use client";
import { useRef, useState, Suspense, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import axios from "axios";
import AddPostImage from "@/components/AddPostImage";

import addGray from "@/public/add-gray.png";
import pin from "@/public/create-post/pin.png";
import diskette from "@/public/create-post/diskette.png";
import lock from "@/public/create-post/lock.png";
//uid: bntWcXZUSKQ46EeJtei73g3pijs1

type post = {
  category: string;
  content: string;
  hashtag: string[];
  location: {
    lat: number;
    lon: number;
  };
  picture: string[] | null;
  status: string;
  title: string;
  video: string | null;
};

type area = {
  city: string;
  area: string;
};

const CreatePost = () => {
  const user = useAppSelector((state) => state.user);
  const picRef = useRef<HTMLInputElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const [location, setLocation] = useState<post["location"]>({
    lat: 0,
    lon: 0,
  });
  const [address, setAddress] = useState<area>({
    city: "",
    area: "",
  });

  const checkLocation: React.MouseEventHandler<HTMLDivElement> = () => {
    navigator.geolocation.getCurrentPosition((potion) => {
      console.log(potion.coords.latitude, potion.coords.longitude);
      if (navigator.geolocation) {
        setLocation({
          lat: Number(potion.coords.latitude),
          lon: Number(potion.coords.longitude),
        });
        const googleMapApi = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${potion.coords.latitude}0,${potion.coords.longitude}0&language=zh-TW&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;
        const area = axios.get(googleMapApi).then((area) => {
          const result = area.data.results[0].address_components.reverse();
          setAddress({
            city: result[2].long_name,
            area: result[3].long_name,
          });
          console.log(
            area.data.results[0].address_components.reverse()[3].long_name
          );
          console.log(
            area.data.results[0].address_components.reverse()[4].long_name
          );
        });
      }
    });
  };

  const createPost = () => {
    const post: post = {
      category: "makeup",
      content: "今天心情好",
      hashtag: ["#tag", "metoo"],
      location: {
        lat: 123,
        lon: 456,
      },
      picture: [
        "https://fakeimg.pl/300x200/200",
        "https://fakeimg.pl/300x200/200",
      ],
      status: "published",
      title: "文章標題",
      video: null,
    };
    axios
      .post(
        "/api/create-post",
        { post },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const createDraft = () => {};

  return (
    <div className="wrapper relative pb-[70px]">
      {user.loginStatus ? (
        <>
          <AddPostImage />
          <div className="w-[90vw] mx-auto mt-[5px] mb-[10px] py-[5px]">
            <label htmlFor=""></label>
            <input
              type="text"
              ref={titleRef}
              placeholder="填寫標題會有更多讚喔～"
              className="w-[90vw] border-b-[1px] border-gray-100 p-[10px]"
            />
          </div>
          <div className="w-[90vw] mx-auto mt-[5px] mb-[10px] py-[5px]">
            <textarea
              rows={6}
              cols={40}
              ref={contentRef}
              placeholder="新增貼文內容"
              className="w-[90vw] p-[10px] block border-[1px] border-gray-100"
            ></textarea>
          </div>
          <div className="w-[90vw] mx-auto mt-[5px] mb-[10px] py-[5px] flex gap-5 border-b-[1px] border-gray-100 p-[10px]">
            <div># 話題</div>
            <div>@ 使用者</div>
          </div>
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => checkLocation(e)}
            className="w-[90vw] mx-auto mt-[5px] mb-[10px] py-[5px] flex gap-2"
          >
            <Image src={pin} alt="location icon" width={20} height={20} />
            {address.city.length === 0 && address.area.length === 0 ? (
              <p>新增地點</p>
            ) : (
              <p>
                {address.city} {address.area}
              </p>
            )}
          </div>
          <div className="w-[90vw] mx-auto mt-[5px] mb-[10px] py-[5px] flex gap-2">
            <Image src={lock} alt="check auth icon" width={20}></Image>
            <select name="" id="">
              <option value="">公開可看</option>
              <option value="">僅自己可看</option>
            </select>
          </div>

          <div className="w-[90vw] h-[50px] p-[30px] flex justify-between items-center fixed bottom-0 bg-white">
            <div className="">
              <Image
                src={diskette}
                alt="save draft icon"
                className="m-auto"
              ></Image>
              <p className="text-[10px]">存草稿</p>
            </div>
            <div className="w-[100vw] h-[40px] bg-red-500 flex items-center justify-center rounded-full text-white cursor-pointer">
              釋出筆記
            </div>
          </div>
        </>
      ) : (
        <Link href="../main" className="">
          請先登入！
        </Link>
      )}
    </div>
  );
};

export default CreatePost;
//upload with server side
// const formData = new FormData();
// formData.append("image", picRef?.current.files?.[0]);
// const response = await axios.post("/api/create", formData);
// const response = await fetch("/api/create", {
//   method: "POST",
//   body: { images: picRef.current?.files[0] },
// });
