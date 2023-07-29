"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import NativeLogin from "@/components/login/NativeLogin";
import landing from "@/public/background/landing.png";

function Main() {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user.loginStatus) {
      router.push(`/`);
    }
  }, [router, user.loginStatus]);

  return (
    <main>
      <NativeLogin />
      <div className="w-[100vw] h-[100vh] relative after:bg-black after:w-[100vw] after:h-[100vh] after:absolute after:opacity-40">
        <Image
          src={landing}
          alt="background image"
          fill
          sizes="100%"
          className="object-cover object-[-300px_0px] xl:object-fit xl:object-left"
        />
      </div>
    </main>
  );
}

export default Main;
