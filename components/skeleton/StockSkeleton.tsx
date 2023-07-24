import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const StockSkeleton = () => {
  const forRender = new Array(8).fill(0);

  return (
    <div className="w-[95vw] max-w-[1200px] mx-auto flex flex-wrap justify-between md:justify-start md:gap-3 md:w-[90vw] xl:gap-4 2xl:max-w-[1600px]">
      {forRender.map((item, index) => (
        <div
          key={index}
          className="w-[calc(50%_-_4px)] h-[170px] mb-[90px] relative z-0 md:w-[calc(33%_-_15px)] md:h-[250px] xl:w-[calc(25%_-_15px)] xl:h-[280px] 2xl:w-[calc(25%_-_15px)] 2xl:h-[350px]"
        >
          <Skeleton
            count={1}
            height="80%"
            width="100%"
            circle={false}
            className="mb-2"
          />

          <Skeleton count={1} width="80%" height="15px" circle={false} />
          <Skeleton
            count={1}
            width="60%"
            height="15px"
            circle={false}
            className="mb-1"
          />

          <div className="w-[calc(50%_-_4px)] md:w-[calc(33%_-_15px)] xl:w-[calc(25%_-_15px)]">
            <Skeleton count={2} width="60px" height="10px" circle={false} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StockSkeleton;
