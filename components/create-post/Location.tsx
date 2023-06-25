import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import pin from "@/public/create-post/pin.png";

interface LocationProps {
  location: {
    lat: number | null;
    lon: number | null;
  };
  address: {
    city: string | null;
    area: string | null;
  };
  setLocation: React.Dispatch<
    React.SetStateAction<{ lat: number | null; lon: number | null }>
  >;
  setAddress: React.Dispatch<
    React.SetStateAction<{ city: string | null; area: string | null }>
  >;
}

const Location: React.FC<LocationProps> = ({
  location,
  setLocation,
  address,
  setAddress,
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const checkLocation: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsClicked(true);
    navigator.geolocation.getCurrentPosition((potion) => {
      if (navigator.geolocation) {
        setLocation({
          lat: Number(potion.coords.latitude),
          lon: Number(potion.coords.longitude),
        });

        const googleMapApi = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${potion.coords.latitude}0,${potion.coords.longitude}0&language=zh-TW&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;

        const area = axios.get(googleMapApi).then((area) => {
          const result = area.data.results[0].address_components.reverse();
          setAddress({
            city: result[2].long_name,
            area: result[3].long_name,
          });
          console.log(
            area.data.results[0].address_components.reverse()[3].long_name
          );
          console.log(
            area.data.results[0].address_components.reverse()[4].long_name
          );
        });
      }
    });
  };

  return (
    <>
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => checkLocation(e)}
        className="w-[90vw] mx-auto mt-[5px] mb-[10px] py-[10px] pl-[10px] flex gap-2"
      >
        <Image src={pin} alt="location icon" width={20} height={20} />
        {!isClicked ? (
          <p>新增打卡地點</p>
        ) : address.city?.length === 0 && address.area?.length === 0 ? (
          <p>地點搜尋中...</p>
        ) : (
          <p>
            {address.city} / {address.area}
          </p>
        )}
      </div>
    </>
  );
};

export default Location;
