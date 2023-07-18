import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostDetailSkeleton = () => {
  return (
    <div className="md:w-[80vw] md:mt-[80px] md:flex md:justify-center md:gap-5 md:mx-auto xl:mt-[95px] md:bg-white md:rounded-lg md:h-[80vh] md:relative">
      <div className="flex gap-8">
        <Skeleton count={1} width="40vw" height="600px" circle={false} />
        <div>
          <div className="w-[30vw] flex justify-between items-center mb-10">
            <div className="flex gap-2 items-center">
              <Skeleton count={1} width="50px" height="50px" circle={true} />
              <Skeleton count={1} width="70px" height="10px" circle={false} />
            </div>
            <Skeleton count={1} width="70px" height="40px" circle={false} />
          </div>
          <Skeleton count={1} width="20%" height="10px" circle={false} />
          <Skeleton
            count={1}
            width="60%"
            height="25px"
            circle={false}
            className="mb-2"
          />
          <Skeleton
            count={1}
            width="30%"
            height="15px"
            circle={false}
            className="mb-1"
          />
          <Skeleton
            count={1}
            width="30%"
            height="15px"
            circle={false}
            className="mb-1"
          />
          <Skeleton
            count={1}
            width="30%"
            height="15px"
            circle={false}
            className="mb-3"
          />
          <Skeleton
            count={1}
            width="20%"
            height="10px"
            circle={false}
            className="mb-[60px]"
          />

          <Skeleton
            count={1}
            width="100%"
            height="50px"
            circle={false}
            className="mb-5"
          />
          <Skeleton
            count={1}
            width="100%"
            height="50px"
            circle={false}
            className="mb-5"
          />
          <Skeleton
            count={1}
            width="100%"
            height="50px"
            circle={false}
            className="mb-5"
          />
          <Skeleton count={1} width="100%" height="50px" circle={false} />
        </div>
      </div>
    </div>
  );
};

export default PostDetailSkeleton;
