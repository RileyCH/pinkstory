import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { collection, doc } from "firebase/firestore";
import Cropper from "react-easy-crop";
import { storage, db } from "@/utils/database";
import { useAppSelector } from "@/redux/hooks";
import { getCroppedImg } from "@/utils/canvasUtils";
import BackDiv from "@/components/BackDiv";
import back from "@/public/back.png";
import plus from "@/public/create-post/plus.png";

interface CropXY {
  x: number;
  y: number;
}

interface Crop {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface AddPostImageProps {
  postImage: string[];
  setPostImage: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddPostImage: React.FC<AddPostImageProps> = ({
  postImage,
  setPostImage,
}) => {
  const user = useAppSelector((state) => state.user);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [crop, setCrop] = useState<CropXY>({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Crop>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [croppedImage, setCroppedImage] = useState<string>("");

  const readImage = (image: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(image);
    });
  };

  const inputPostImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageFile = e.target.files[0];
      const imageDataUrl = await readImage(imageFile);
      setImageSrc(imageDataUrl);
    }
  };

  const onCropComplete = useCallback((_: Crop, croppedAreaPixels: Crop) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedImage) {
        setCroppedImage(croppedImage);
        setImageSrc("");
      }
    } catch (e) {
      window.alert("請重新上傳圖片456");
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  useEffect(() => {
    const uploadImage = async () => {
      if (croppedImage) {
        try {
          const randomId = doc(collection(db, "temp")).id;
          const mountainsRef = ref(storage, `/${user.uid}/images/${randomId}`);
          await uploadString(mountainsRef, croppedImage, "data_url");
          const url = await getDownloadURL(mountainsRef);
          setPostImage((prev) => [...prev, url]);
        } catch (error) {
          window.alert("請重新上傳圖片123");
          console.error(error);
        }
      }
    };
    uploadImage();
  }, [croppedImage, user.uid, setPostImage]);

  return (
    <div className="w-[90vw] mx-auto md:mt-3">
      <div className="w-[100vw] h-[55px] pt-[15px] pb-[20px] px-[15px] flex justify-between items-center fixed top-0 left-0 bg-white z-30 drop-shadow-sm">
        <BackDiv url={"post"} />
      </div>

      <div className="w-[100%] mt-[60px] md:mt-1">
        <div className="w-[100%] flex items-center justify-start gap-3 overflow-x-auto no-scrollbar">
          {postImage.length > 0
            ? postImage.map((url, index) => (
                <div key={index} className={`relative flex-none`}>
                  <div className="relative md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] md:border md:border-themeGray-200 md:rounded-lg">
                    <Image
                      src={url}
                      alt="post"
                      fill
                      sizes="100%"
                      className="md:rounded-lg"
                    />
                  </div>

                  <div
                    className="w-[20px] h-[20px] rounded-md bg-themeGray-700 bg-opacity-40 text-white flex justify-center items-center text-xs absolute right-0 top-0 hover:cursor-pointer hover:bg-stone-800"
                    onClick={() =>
                      setPostImage((prev) => {
                        const updatedArray = [...prev];
                        updatedArray.splice(index, 1);
                        return updatedArray;
                      })
                    }
                  >
                    X
                  </div>
                </div>
              ))
            : ""}

          <form
            className={`w-[200px] h-[200px] border border-themeGray-200 rounded-lg flex items-center justify-start md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] hover:border-themePink-400`}
          >
            <label className="w-[200px] h-[100%] flex justify-center items-center md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px]">
              <Image
                src={plus}
                alt="add new post image"
                width={20}
                height={20}
              />
              <input
                type="file"
                accept="image/*"
                onChange={inputPostImage}
                className="hidden"
              />
            </label>
          </form>
        </div>
      </div>

      {imageSrc ? (
        <div className="w-[90vw] h-[90vh] fixed top-4 left-0 right-0 mx-auto bg-white z-50">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={100 / 100}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
          <div className="w-[90vw] flex gap-2 absolute bottom-[50px] left-0 right-0 mx-auto justify-center">
            <div
              onClick={() => setImageSrc("")}
              className="bg-stone-500 px-[20px] py-[10px] rounded-full text-white hover:cursor-pointer hover:bg-stone-800"
            >
              放棄
            </div>
            <div
              onClick={showCroppedImage}
              className="bg-red-500 px-[20px] py-[10px] rounded-full text-white  hover:cursor-pointer hover:bg-red-600"
            >
              確定
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddPostImage;
