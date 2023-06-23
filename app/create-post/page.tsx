"use client";
import { useRef, FormEvent, ChangeEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { storage, db } from "../../utils/database";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc } from "firebase/firestore";

import back from "../../public/back.png";
import addGray from "../../public/add-gray.png";
import pin from "../../public/create-post/pin.png";
import diskette from "../../public/create-post/diskette.png";
import note from "../../public/create-post/note.png";
import lock from "../../public/create-post/lock.png";

const CreatePost = () => {
  const picRef = useRef<HTMLInputElement | null>(null);
  const [postImage, setPostImage] = useState<string[]>([]);
  const handleFileChange = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //upload with server side
      // const formData = new FormData();
      // formData.append("image", picRef?.current.files?.[0]);
      // const response = await axios.post("/api/create", formData);
      // const response = await fetch("/api/create", {
      //   method: "POST",
      //   body: { images: picRef.current?.files[0] },
      // });
      const randomId = doc(collection(db, "temp")).id;
      const mountainsRef = ref(
        storage,
        `/jTTwP6G66wayBPRlKt6XiVJQ79T2/images/${randomId}`
      );
      if (picRef.current?.files && picRef.current.files.length > 0) {
        const file = picRef.current.files[0];
        await uploadBytes(mountainsRef, file);
        const url = await getDownloadURL(mountainsRef);
        setPostImage((prev) => [...prev, url]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="wrapper relative">
      <div className="w-[100%] h-[50px] p-[5px] flex justify-between fixed top-0 bg-white">
        <Link href="../main">
          <Image src={back} alt="back to main page" width={45} height={45} />
        </Link>
        <div>
          <Image src={note} alt="back to main page" />
        </div>
      </div>

      <div className="mt-[55px] flex gap-3">
        {postImage.length > 0 ? (
          postImage.map((url, index) => (
            <Image
              key={index}
              src={url}
              alt="back to main page"
              width={200}
              height={200}
              style={{ objectFit: "cover" }}
            />
          ))
        ) : (
          <div className="w-[150px] bg-gray-100"></div>
        )}

        <form
          className="bg-gray-100 border-none p-10"
          onSubmit={(e: React.ChangeEvent<HTMLFormElement>) =>
            handleFileChange(e)
          }
        >
          <input
            type="file"
            accept="video/*,image/*"
            ref={picRef}
            className="w-[50px] h-[50px] bg-gray-100 flex justify-center items-center"
          />
        </form>
      </div>
      <div className="w-[90%] mx-auto mt-[5px] mb-[10px] py-[5px]">
        <label htmlFor=""></label>
        <input
          type="text"
          placeholder="填寫標題會有更多讚喔～"
          className="w-[100%] border-b-[1px] border-gray-100 p-[10px]"
        />
      </div>
      <div className="w-[90%] mx-auto mt-[5px] mb-[10px] py-[5px]">
        <textarea
          rows="6"
          cols="40"
          placeholder="新增貼文內容"
          className="w-[100%] p-[10px] block border-[1px] border-gray-100"
        ></textarea>
      </div>
      <div className="w-[90%] mx-auto mt-[5px] mb-[10px] py-[5px] flex gap-5 border-b-[1px] border-gray-100 p-[10px]">
        <div># 話題</div>
        <div>@ 使用者</div>
      </div>
      <div className="w-[90%] mx-auto mt-[5px] mb-[10px] py-[5px] flex gap-2">
        <Image src={pin} alt="location icon" width={20} />
        <p>新增地點</p>
      </div>
      <div className="w-[90%] mx-auto mt-[5px] mb-[10px] py-[5px] flex gap-2">
        <Image src={lock} alt="check auth icon" width={20}></Image>
        <select name="" id="">
          <option value="">公開可看</option>
          <option value="">僅自己可看</option>
        </select>
      </div>

      <div className="w-[100vw] h-[50px] p-[30px] flex justify-between items-center fixed bottom-0 bg-white">
        <div className="">
          <Image
            src={diskette}
            alt="save draft icon"
            className="m-auto"
          ></Image>
          <p className="text-[10px]">存草稿</p>
        </div>
        <div className="w-[90%] h-[40px] bg-red-500 flex items-center justify-center rounded-full text-white">
          釋出筆記
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
