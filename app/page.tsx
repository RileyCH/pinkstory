"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import NativeLogin from "@/components/login/NativeLogin";
import landing from "@/public/background/landing.png";

export default function Home() {
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    if (user.loginStatus) {
      router.push(`main/${user.uid}`);
    }
  }, [router, user.loginStatus, user.uid]);

  return (
    <main>
      <NativeLogin />
      <div className="w-[100vw] h-[100vh] relative after:bg-black after:w-[100vw] after:h-[100vh] after:absolute after:opacity-40">
        <Image
          src={landing}
          alt="landing page background image"
          fill
          sizes="100%"
          priority={true}
          className="object-cover object-[-300px_0px] xl:object-fit xl:object-left"
        />
      </div>
    </main>
  );
}
