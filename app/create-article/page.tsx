"use client";
import { useRef, FormEvent, ChangeEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import back from "../../public/back.png";
import addGray from "../../public/add-gray.png";
import { storage, db } from "../../utils/database";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc } from "firebase/firestore";

const CreateArticle = () => {
  const picRef = useRef<HTMLInputElement | null>(null);
  const [articleImage, setArticleImage] = useState<string[]>([]);
  const handleFileChange = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
      const mountainsRef = ref(storage, `/images/${randomId}`);
      if (picRef.current?.files && picRef.current.files.length > 0) {
        const file = picRef.current.files[0];
        await uploadBytes(mountainsRef, file);
        const url = await getDownloadURL(mountainsRef);
        setArticleImage((prev) => [...prev, url]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(articleImage);

  return (
    <div>
      <Link href="../main">
        <Image src={back} alt="back to main page" width={30} height={30} />
      </Link>

      <div className="flex gap-3">
        {articleImage.length > 0
          ? articleImage.map((url, index) => (
              <div
                key={index}
                className=" bg-gray-100 flex justify-center align-center"
              >
                <video
                  src={url}
                  alt="back to main page"
                  width={100}
                  height={100}
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))
          : ""}
        <form>
          <input
            type="file"
            accept="video/*,image/*"
            id="input"
            name="fileInput"
            ref={picRef}
            className="w-[50px] h-[50px] bg-gray-100 flex justify-center align-center"
          />
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleFileChange(e)
            }
          >
            點我上傳
          </button>
        </form>
      </div>
      <div>
        <label htmlFor=""></label>
        <input
          type="text"
          placeholder="填寫標題會有更多讚喔～"
          className="border-b-[1px] border-gray-100 p-[10px]"
        />
        <span className="text-gray-400">20</span>
      </div>
      <div>
        <input
          type="text"
          placeholder="説説此刻的心情"
          className="p-[100px] block"
        />
      </div>
    </div>
  );
};

export default CreateArticle;
