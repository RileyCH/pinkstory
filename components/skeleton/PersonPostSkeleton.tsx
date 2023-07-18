import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PersonPostSkeleton = () => {
  const forRender = new Array(4).fill(0);

  return (
    <div className="w-[95vw] max-w-[1200px] mx-auto flex flex-wrap justify-between md:flex md:justify-start md:gap-3 md:w-[90vw] md:mx-auto xl:gap-4 mt-5">
      {forRender.map((item, index) => (
        <div
          key={index}
          className="w-[47vw] h-[170px] relative md:w-[29vw] md:h-[250px] xl:w-[15vw] xl:h-[300px] mb-[50px]"
        >
          <Skeleton
            count={1}
            height="80%"
            width="100%"
            circle={false}
            className="mb-2"
          />
          <Skeleton count={1} width="100%" height="30px" circle={false} />
          <div className="w-[47vw] md:w-[29vw] xl:w-[20vw] flex items-center gap-3 mt-2">
            <Skeleton count={1} width="40px" height="40px" circle={true} />
            <Skeleton count={1} width="80px" height="20px" circle={false} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PersonPostSkeleton;
