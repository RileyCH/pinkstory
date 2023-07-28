import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostDetailSkeleton = () => {
  return (
    <div className="z-0 md:w-[80vw] md:mt-[80px] md:flex md:justify-center md:gap-5 md:mx-auto xl:mt-[95px] md:bg-white md:rounded-lg md:h-[80vh] md:relative">
      <div className=" md:flex md:gap-8">
        <div className="w-[100vw] h-[400px] md:w-[450px] md:h-[80vh] xl:w-[550px]">
          <Skeleton count={1} width="100%" height="100%" circle={false} />
        </div>

        <div>
          <div className="hidden md:w-[30vw] md:flex md:justify-between md:items-center md:pt-5">
            <div className="md:flex md:gap-2 md:items-center">
              <Skeleton count={1} width="50px" height="50px" circle={true} />
              <Skeleton count={1} width="70px" height="10px" circle={false} />
            </div>
            <Skeleton count={1} width="70px" height="40px" circle={false} />
          </div>
          <div className="px-[15px] md:px-0">
            <Skeleton
              count={1}
              width="15%"
              height="10px"
              circle={false}
              className="mt-[20px] md:mt-[40px]"
            />
            <Skeleton
              count={1}
              width="70%"
              height="25px"
              circle={false}
              className="mb-4"
            />
            <Skeleton
              count={3}
              width="40%"
              height="15px"
              circle={false}
              className="mb-1"
            />
            <Skeleton
              count={1}
              width="20%"
              height="10px"
              circle={false}
              className="mt-3 mb-[20px] md:mb-[60px]"
            />

            <Skeleton
              count={4}
              width="100%"
              height="50px"
              circle={false}
              className="mb-1 md:mb-3 xl:mb-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailSkeleton;
