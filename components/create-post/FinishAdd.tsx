import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

const FinishAdd = () => {
  const userStatus = useAppSelector((state) => state.user);
  return (
    <div className="fixed w-[100vw] h-[100vh] bg-black bg-opacity-70 top-0 right-0 left-0 z-40 mx-auto text-center flex flex-col justify-center items-center">
      <p className="text-white mb-[20px]">您已成功新增文章</p>
      <Link
        href={`/main/${userStatus.uid}`}
        className="w-[100px] py-[10px] bg-red-500 rounded-lg text-white cursor-pointer hover:bg-red-600"
      >
        回到主頁
      </Link>
    </div>
  );
};

export default FinishAdd;
