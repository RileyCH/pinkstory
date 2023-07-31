import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FollowSkeleton = () => {
  const arrayForRender = new Array(8).fill(0);
  return (
    <>
      {arrayForRender.map((item, index) => (
        <div key={index} className="flex gap-1 items-center ml-3 my-4 md:gap-3">
          <div className="w-[25px] h-[25px] md:w-[30px] md:h-[30px] lg:w-[35px] lg:h-[35px]">
            <Skeleton count={1} width="100%" height="100%" circle={true} />
          </div>

          <div>
            <Skeleton count={1} width="15vw" height="15px" circle={false} />
          </div>
        </div>
      ))}
    </>
  );
};

export default FollowSkeleton;
