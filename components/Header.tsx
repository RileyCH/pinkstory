import Link from "next/link";
import Image from "next/image";
import pinkStory from "@/public/pinkStory-p.png";

const Header = () => {
  return (
    <Link href="/post">
      <div className="w-[100vw] py-[5px] mb-3 bg-gradient-to-tl from-[#fae8e6] from-10% via-[#F9D1BA] via-30% to-[#f9b6b0] to-80% drop-shadow-sm fixed z-30 md:z-0">
        <div className="w-[85px] h-[30px] my-1 relative mx-auto md:hidden">
          <Image src={pinkStory} alt="logo" />
        </div>
      </div>
    </Link>
  );
};

export default Header;
