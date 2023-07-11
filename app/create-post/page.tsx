"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { loginUser } from "@/redux/features/signup/loginSlice";
import AddPostImage from "@/components/create-post/AddPostImage";
import TagUser from "@/components/create-post/TagUser";
import Location from "@/components/create-post/Location";
import FinishAdd from "@/components/create-post/FinishAdd";
import Nav from "@/components/Nav";
import { PostType } from "@/utils/type";
import category from "@/public/create-post/category.png";
import diskette from "@/public/create-post/diskette.png";
import back from "@/public/back.png";
import lock from "@/public/create-post/lock.png";

const CreatePost = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [postImage, setPostImage] = useState<string[]>([]);
  const categories = [
    { value: "makeup", label: "美妝" },
    { value: "fashion", label: "穿搭" },
    { value: "beautyCare", label: "保養" },
    { value: "travel", label: "旅遊" },
    { value: "book", label: "書籍" },
    { value: "movie", label: "電影" },
    { value: "workout", label: "運動" },
    { value: "food", label: "美食" },
    { value: "3c", label: "3C" },
    { value: "study", label: "學習" },
    { value: "babyCare", label: "育兒" },
    { value: "photography", label: "攝影" },
    { value: "pet", label: "寵物" },
  ];
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tagUsers, setTagUsers] = useState<string[] | []>([]);
  const [location, setLocation] = useState<PostType["data"]["location"]>({
    lat: 0,
    lon: 0,
  });
  const [address, setAddress] = useState<PostType["data"]["address"]>({
    city: "",
    area: "",
  });
  const [postAuth, setPostAuth] = useState<string>("");
  const [postStatus, setPostStatus] = useState<string>("published");
  const [createStatus, setCreateStatus] = useState<boolean>(false);

  const createPost = () => {
    if (user.uid) {
      const postDetails: PostType["data"] = {
        uid: user.uid,
        picture: postImage,
        category: selectCategory,
        title: title,
        content: content,
        tagUer: tagUsers,
        location: {
          lat: location.lat,
          lon: location.lon,
        },
        address: {
          city: address.city,
          area: address.area,
        },
        authority: postAuth,
        status: postStatus,
        loveUser: [],
        keepUser: [],
        createTime: null,
      };

      axios
        .post(
          "/api/create-post",
          { postDetails },
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

  useEffect(() => {
    const checkUid = localStorage.getItem("uid");
    if (checkUid) {
      dispatch(loginUser({ uid: checkUid, email: "", password: "" }));
    }
  }, [dispatch]);

  return (
    <div className="wrapper relative pb-[70px]">
      {user.uid ? (
        <div className="">
          <div className="w-[100vw] h-[50px] pt-[15px] px-[15px] mb-2 flex justify-between items-center fixed top-0 left-0 bg-white z-30">
            <Link href="../main">
              <Image
                src={back}
                alt="back to main page"
                width={25}
                height={25}
              />
            </Link>
          </div>
          <AddPostImage postImage={postImage} setPostImage={setPostImage} />
          <div className="w-[90vw] mx-auto mt-[20px] mb-[10px] py-[5px] pl-[10px] flex gap-2">
            <Image src={category} alt="check auth icon" width={20}></Image>
            <select
              name=""
              id=""
              onChange={(e) => setSelectCategory(e.target.value)}
            >
              文章類別
              <option value="none" disabled>
                文章類別
              </option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="w-[90vw] mx-auto mt-[5px] mb-[10px] py-[5px]">
            <label htmlFor=""></label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="填寫標題會有更多讚喔～"
              className="w-[90vw] border-b-[1px] border-gray-100 p-[10px]"
            />
          </div>
          <div className="w-[90vw] mx-auto mt-[5px] mb-[10px] py-[5px]">
            <textarea
              rows={6}
              cols={40}
              onChange={(e) => setContent(e.target.value)}
              placeholder="新增貼文內容"
              className="w-[90vw] p-[10px] block border-[1px] border-gray-100"
            />
          </div>
          <div className="w-[90vw] mx-auto mt-[5px] mb-[20px] py-[15px] flex gap-5 border-b-[1px] border-gray-100 p-[10px]">
            <TagUser
              uid={user.uid}
              tagUsers={tagUsers}
              setTagUsers={setTagUsers}
            />
          </div>
          <Location
            location={location}
            setLocation={setLocation}
            address={address}
            setAddress={setAddress}
          />
          <div className="w-[90vw] mx-auto mt-[5px] mb-[10px] py-[5px] pl-[10px] flex gap-2">
            <Image src={lock} alt="check auth icon" width={20}></Image>
            <select name="" id="" onChange={(e) => setPostAuth(e.target.value)}>
              文章瀏覽權限
              <option value="none" disabled>
                文章瀏覽權限
              </option>
              <option value="public">公開可看</option>
              <option value="private">僅自己可看</option>
            </select>
          </div>
          <div className="w-[100vw] h-[50px] px-[20px] py-[30px] flex gap-[20px] justify-center items-center fixed bottom-0 bg-white">
            <div className="">
              <Image
                src={diskette}
                alt="save draft icon"
                className="m-auto mb-1"
              ></Image>
              <p
                className="text-[10px]"
                onClick={() => setPostStatus("drafted")}
              >
                草稿
              </p>
            </div>
            <div
              className="w-[80%] h-[40px] bg-red-500 flex items-center justify-center rounded-full text-white cursor-pointer"
              onClick={createPost}
            >
              發佈貼文
            </div>
          </div>
          {createStatus && <FinishAdd />}
        </div>
      ) : (
        <div className="text-center mt-[250px]">
          <p className="mb-[30px]">
            您目前尚未登入，
            <br />
            需登入才能發佈文章
          </p>
          <Link
            href="/main"
            className="bg-[#FB6E6E] hover:bg-[#b62c2c] text-white px-[20px] py-[10px] rounded-sm cursor-pointer"
          >
            點此登入
          </Link>
          <Nav />
        </div>
      )}
      <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD9rPlvAdkzmyTmkt6YSmp-LJYn4_RGq30&libraries=geometry"
        async
        defer
      ></script>
    </div>
  );
};

export default CreatePost;
