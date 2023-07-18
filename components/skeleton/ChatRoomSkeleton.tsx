import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ChatRoomSkeleton = () => {
  const arrayForRender = new Array(7).fill(0);
  return (
    <>
      {arrayForRender.map((item, index) => (
        <div key={index} className="flex gap-3 items-center ml-3 mb-4">
          <Skeleton count={1} width="70px" height="70px" circle={true} />
          <div>
            <Skeleton
              count={1}
              width="5vw"
              height="20px"
              circle={false}
              className="mb-1"
            />
            <Skeleton count={1} width="18vw" height="15px" circle={false} />
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatRoomSkeleton;
