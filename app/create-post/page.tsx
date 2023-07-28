"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { loginUser } from "@/redux/features/signup/loginSlice";
import BackDiv from "@/components/BackDiv";
import AddPostImage from "@/components/create-post/AddPostImage";
import TagUser from "@/components/create-post/TagUser";
import Location from "@/components/create-post/Location";
import FinishAdd from "@/components/create-post/FinishAdd";
import Nav from "@/components/Nav";
import { PostType } from "@/utils/type";
import lock from "@/public/create-post/lock.png";

const CreatePost = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [postImage, setPostImage] = useState<string[]>([]);
  const categories = [
    { value: "makeup", label: "彩妝" },
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
  const [tagUsers, setTagUsers] = useState<any>([]);
  const [location, setLocation] = useState<PostType["data"]["location"]>({
    lat: 0,
    lon: 0,
  });
  const [address, setAddress] = useState<PostType["data"]["address"]>({
    city: "",
    area: "",
  });
  const [postAuth, setPostAuth] = useState<string>("public");
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
    <div className="wrapper relative pb-[70px] pt-1 bg-themeGray-50 min-h-screen md:pt-[70px] md:pb-[20px]">
      <div className="w-[100vw] h-[50px] px-[15px] flex items-center fixed top-0 left-0 bg-white z-30 drop-shadow">
        <BackDiv url={`main/${user.uid}`} />
      </div>
      {user.uid ? (
        <div className="md:bg-white md:w-[95vw] md:rounded-xl md:mx-auto md:py-[20px]">
          <p className="flex items-center font-semibold text-themePink-700 w-[90vw] pl-[12px] mx-auto relative before:w-1 before:h-4 before:absolute before:bg-themePink-400 before:top-1 before:left-0 before:rounded-md md:text-[18px] md:before:h-[20px]">
            發佈圖文
          </p>
          <AddPostImage postImage={postImage} setPostImage={setPostImage} />

          <div className="w-[90vw] mx-auto mt-[20px] mb-[10px] py-[5px] pl-[10px] flex gap-4 items-center">
            <label className="text-[14px]">
              選擇看板<span className="text-themePink-600">*</span>
            </label>
            <select
              onChange={(e) => setSelectCategory(e.target.value)}
              className="w-[80px] text-[14px] px-1 py-1 border border-themeGray-200 rounded-md hover:border-themePink-400 cursor-pointer"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="w-[90vw] mx-auto mt-[5px] mb-[10px] py-[5px]">
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="填寫標題會有更多讚喔～"
              className="w-[90vw] border border-themeGray-200 p-[10px] rounded-lg placeholder:text-[12px] md:placeholder:text-[14px] hover:border-themePink-400"
            />
          </div>
          <div className="w-[90vw] mx-auto mt-[5px] py-[5px] mb-3">
            <textarea
              rows={5}
              cols={40}
              onChange={(e) => setContent(e.target.value)}
              placeholder="新增貼文內容"
              className="w-[90vw] p-[10px] block border-[1px] resize-none border-themeGray-200 rounded-lg placeholder:text-[12px] md:placeholder:text-[14px] hover:border-themePink-400"
            />
          </div>
          <TagUser
            uid={user.uid}
            tagUsers={tagUsers}
            setTagUsers={setTagUsers}
          />
          <Location
            location={location}
            setLocation={setLocation}
            address={address}
            setAddress={setAddress}
          />
          <div className="w-[90vw] mx-auto mt-[5px] mb-[20px] py-[5px] pl-[10px] flex gap-2 items-center">
            <div className="w-[15px] h-[15px] relative">
              <Image src={lock} alt="check auth icon" fill sizes="100%"></Image>
            </div>

            <label className="text-[14px] mr-3">
              瀏覽權限<span className="text-themePink-600">*</span>
            </label>
            <div
              className="flex items-center mr-5"
              onClick={() => setPostAuth("public")}
            >
              <input
                type="radio"
                name="authority"
                value="public"
                id="public"
                className="mr-[6px]"
                defaultChecked
              />
              <label htmlFor="public" className="text-[14px] cursor-pointer">
                公開可看
              </label>
            </div>

            <div
              className="flex items-center"
              onClick={() => setPostAuth("private")}
            >
              <input
                type="radio"
                name="authority"
                value="private"
                id="private"
                className="mr-[6px]"
              />
              <label htmlFor="private" className="text-[14px] cursor-pointer">
                僅自己可看
              </label>
            </div>
          </div>
          <div className="w-[100vw] h-[50px] px-[20px] py-[30px] flex gap-[20px] justify-center items-center fixed bottom-0 bg-white md:static md:w-[90vw] md:mx-auto md:justify-start md:px-0">
            <Link href="/post">
              <p className="hidden md:w-[100px] md:h-[40px] md:rounded-lg md:border md:border-themeGray-400 md:text-themeGray-400 md:flex md:items-center md:justify-center md:hover:border-themeGray-800 md:hover:text-themeGray-80 md:cursor-pointer">
                取消
              </p>
            </Link>
            <p
              className="w-[95vw] h-[40px] bg-themePink-400 hover:bg-themePink-500 flex items-center justify-center rounded-full text-white cursor-pointer md:w-[100px] md:rounded-lg"
              onClick={createPost}
            >
              發佈
            </p>
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
            className="bg-themePink-400 hover:bg-themePink-500 text-white px-[20px] py-[10px] rounded-sm cursor-pointer"
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
