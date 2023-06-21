import Link from "next/link";
import Image from "next/image";
import add from "../public/add.png";

const Nav = () => {
  return (
    <nav className="w-[100vw] h-[100px] flex justify-evenly fixed bottom-[15vh]">
      <Link href="/">首頁</Link>
      <Link href="../live-stream">直播</Link>
      <Link href="../create-article">
        <Image src={add} alt="add a new post" width={30} height={30} />
      </Link>
      <Link href="../message">訊息</Link>
      <Link href="../main">主頁</Link>
    </nav>
  );
};

export default Nav;
