import Link from "next/link";
import Image from "next/image";
import more from "@/public/main/more.png";

const AddStock = ({ uid }: { uid: string }) => {
  return (
    <Link
      href={`/main/${uid}/stock`}
      className="flex items-center gap-1 md:gap-2"
    >
      <div className="w-[15px] h-[15px] relative">
        <Image src={more} alt="add new stock" fill sizes="100%" />
      </div>
      <p className="text-[10px] text-themePink-400 md:text-[14px] xl:text-[16px] xl:gap-3 hover:font-semibold">
        新增
      </p>
    </Link>
  );
};

export default AddStock;
