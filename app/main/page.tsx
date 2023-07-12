"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import NativeLogin from "@/components/login/NativeLogin";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import landing from "@/public/background/landing.png";

function Main() {
  const user = useAppSelector((state) => state.user.uid);
  const router = useRouter();

  useEffect(() => {
    const localUid = localStorage.getItem("uid");
    if (!localUid) {
      router.push(`/`);
    }
  }, []);

  return (
    <main>
      <NativeLogin />
      <div className="w-[100vw] h-[100vh] relative after:bg-black after:w-[100vw] after:h-[100vh] after:absolute after:opacity-40">
        <Image
          src={landing}
          alt=""
          fill
          className="object-cover object-[-300px_0px] xl:object-fit xl:object-left"
        />
      </div>
    </main>
    // <div className="text-center">
    //   {/* <Header /> */}
    //   {/* {!user && <NativeLogin />} */}
    //   <div className="w-[100vw] h-[100vh] relative after:bg-black after:w-[100vw] after:h-[100vh] after:absolute after:opacity-40">
    //     <Image
    //       src={landing}
    //       alt=""
    //       fill
    //       className="object-cover object-[-300px_0px] xl:object-fit xl:object-left"
    //     />
    //   </div>
    // </div>
  );
}

export default Main;
