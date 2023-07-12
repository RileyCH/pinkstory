"use client";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import NativeLogin from "@/components/login/NativeLogin";
import Header from "@/components/Header";
import Nav from "@/components/Nav";

function Main() {
  const user = useAppSelector((state) => state.user.uid);
  return (
    <div className="text-center">
      <Header />
      {!user && <NativeLogin />}
      <Nav />
    </div>
  );
}

export default Main;
