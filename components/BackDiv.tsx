import Link from "next/link";
import Image from "next/image";
import backWhite from "@/public/back-white.png";
import backPink from "@/public/back-pink.png";

const BackDiv = ({ url }: { url: string }) => {
  return (
    <>
      <Link href={`/${url}`} className="fixed top-6 left-6 z-30">
        <Image
          src={backPink}
          alt="back to main page"
          width={15}
          height={15}
          blurDataURL={"backWhite"}
        />
      </Link>
    </>
  );
};

export default BackDiv;
