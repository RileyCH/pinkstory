import Link from "next/link";
import Image from "next/image";
import pinkStory from "@/public/pinkStory-p.png";

const Header = () => {
  return (
    <Link
      href="/post"
      className="w-[100vw] py-[8px] bg-gradient-to-tl from-[#fae8e6] from-10% via-[#F9D1BA] via-30% to-[#f9b6b0] to-80% drop-shadow fixed z-30 md:z-0 md:hidden"
    >
      <h1 className="w-[85px] h-[30px] my-1 relative mx-auto">
        <Image
          src={pinkStory}
          alt="PinkStory logo"
          fill
          sizes="100%"
          priority={true}
        />
      </h1>
    </Link>
  );
};

export default Header;
