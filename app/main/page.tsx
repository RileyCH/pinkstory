"use client";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import NativeLogin from "@/components/NativeLogin";
import Nav from "@/components/Nav";

function Main() {
  const user = useAppSelector((state) => state.user.uid);
  return (
    <div>
      <p>請先登入</p>
      {!user && <NativeLogin />}
      <Nav />
    </div>
  );
}

export default Main;
