import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PersonPostSkeleton = () => {
  const forRender = new Array(10).fill(0);

  return (
    <div className="w-[95vw] max-w-[1200px] mx-auto flex flex-wrap justify-between md:justify-start md:gap-3 xl:gap-4 2xl:max-w-[1600px]">
      {forRender.map((item, index) => (
        <div
          key={index}
          className="w-[calc(50%_-_4px)] h-[170px] mb-[80px] z-0 md:w-[calc(25%_-_15px)] md:h-[250px] md:mb-10 xl:w-[calc(20%_-_15px)] xl:h-[300px] 2xl:w-[calc(20%_-_15px)]"
        >
          <Skeleton
            count={1}
            height="80%"
            width="100%"
            circle={false}
            className="mb-2"
          />
          <Skeleton count={1} width="100%" height="30px" circle={false} />
          <div className="w-[calc(50%_-_4px)] flex items-center gap-3 mt-2 md:w-[calc(25%_-_15px)] xl:w-[calc(20%_-_15px)] 2xl:w-[calc(20%_-_15px)]">
            <Skeleton count={1} width="40px" height="40px" circle={true} />
            <Skeleton count={1} width="80px" height="20px" circle={false} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PersonPostSkeleton;
