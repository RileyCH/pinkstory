import Image from "next/image";
import NativeLogin from "@/components/login/NativeLogin";
import landing from "@/public/background/landing.png";
export const revalidate = 0;

export default async function Home() {
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
  );
}
