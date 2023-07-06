"use client";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import NativeLogin from "@/components/NativeLogin";
import Nav from "@/components/Nav";

function Main() {
  const user = useAppSelector((state) => state.user.uid);
  return (
    <div className="text-center">
      <p className="text-[24px] text-center py-[25px]">個人主頁</p>
      {!user && <NativeLogin />}
      <Nav />
    </div>
  );
}

export default Main;
