"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import add from "../public/add.png";

const Nav = () => {
  const [user, setUser] = useState<string | null>("");
  useEffect(() => {
    if (localStorage.getItem("uid")) {
      setUser(localStorage.getItem("uid"));
    }
  }, []);

  return (
    <nav className="fixed -bottom-10">
      <Link href="/">首頁</Link>
      <Link href="/live-stream">直播</Link>
      <Link href="/create-post">
        <Image src={add} alt="add a new post" width={30} height={30} />
      </Link>
      <Link href="/message">訊息</Link>
      {user ? (
        <Link href={`/main/${user}`}>主頁</Link>
      ) : (
        <Link href="/main">主頁</Link>
      )}
    </nav>
  );
};

export default Nav;
