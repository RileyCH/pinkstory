"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { UserLoginInitialState } from "@/utils/type";
import SearchBar from "./post/SearchBar";
import add from "../public/add.png";
import pinkStory from "@/public/pinkStory-p.png";

const Nav = () => {
  const uid = useAppSelector(
    (state: { user: UserLoginInitialState }) => state.user.uid
  );
  const pathname = usePathname();
  const navItems = [
    {
      page: "發現",
      url: "/post",
    },
    {
      page: "直播",
      url: "/live-stream",
    },
    {
      page: "發文",
      url: "/create-post",
    },
    {
      page: "訊息",
      url: "/message",
    },
    {
      page: "個人",
      url: "/main",
    },
  ];

  return (
    <nav>
      <div className="md:flex md:gap-5 md:items-center">
        <Link
          href="/post"
          className="hidden w-[90px] h-[35px] relative md:block"
        >
          <Image
            src={pinkStory}
            alt="logo"
            fill
            className="object-cover"
            sizes="100%"
          />
        </Link>
        <div className="hidden md:block md:max-w-[500px]">
          <SearchBar />
        </div>
      </div>

      <div className="flex gap-[40px] items-center mx-auto md:mx-0 xl:gap-[50px] relative">
        {navItems.map((navItems) => (
          <Link
            key={navItems.url}
            href={
              navItems.url.includes("/main") && uid
                ? `${navItems.url}/${uid}`
                : navItems.url.includes("/main")
                ? "/"
                : navItems.url
            }
            className={`${
              pathname.includes(navItems.url)
                ? "text-themePink-500 md:after:absolute md:after:border-2 md:after:border-themePink-400 md:after:w-[36px] md:after:-bottom-5 md:after:-left-[2px]"
                : "text-themePink-900"
            } hover:text-themePink-500 hover:font-medium relative`}
          >
            {navItems.page === "發文" ? (
              <>
                <p className="hidden md:block">發文</p>
                <div className="w-[35px] h-[35px] bg-themePink-400 flex justify-center items-center rounded-full md:hidden">
                  <Image src={add} alt="add a new post" sizes="100%" />
                </div>
              </>
            ) : (
              navItems.page
            )}
          </Link>
        ))}

        {/* <Link
          href="/post"
          className={`hover:text-themePink-500 hover:font-medium relative ${
            pathname === "/post" &&
            "text-themePink-500 after:absolute after:border-2 after:border-themePink-400 after:w-[36px] after:-bottom-5 after:-left-[2px]"
          }`}
        >
          發現
        </Link>
        <Link
          href="/live-stream"
          className="hover:text-themePink-500 hover:font-medium"
        >
          直播
        </Link>
        <Link href="/create-post">
          <p className="hidden md:block">發文</p>
          <Image
            src={add}
            alt="add a new post"
            width={30}
            height={30}
            className="rounded-full md:hidden"
          />
        </Link>
        <Link
          href="/message"
          className="hover:text-themePink-500 hover:font-medium"
        >
          訊息
        </Link>
        {uid ? (
          <Link
            href={`/main/${uid}`}
            className="hover:text-themePink-500 hover:font-medium"
          >
            主頁
          </Link>
        ) : (
          <Link href="/" className="hover:text-themePink-500 hover:font-medium">
            主頁
          </Link>
        )} */}
      </div>
    </nav>
  );
};

export default Nav;
