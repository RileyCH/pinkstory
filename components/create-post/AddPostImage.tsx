import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { collection, doc } from "firebase/firestore";
import Cropper from "react-easy-crop";
import { storage, db } from "@/utils/database";
import { useAppSelector } from "@/redux/hooks";
import { getCroppedImg } from "@/utils/canvasUtils";
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
    <div className="w-[100vw] mx-auto">
      <div className="w-[100%] h-[50px] pt-[15px] px-[15px] mb-2 flex justify-between items-center fixed top-0 left-0 bg-white z-30">
        <Link href={`/main/${user.uid}`}>
          <Image src={back} alt="back to main page" width={25} height={25} />
        </Link>
      </div>

      <div className="w-[90vw] mx-auto mt-[60px]">
        <div className="mx-auto flex gap-3 overflow-x-auto">
          {postImage.length > 0
            ? postImage.map((url, index) => (
                <div
                  key={index}
                  className={`w-[200px] h-[200px] relative flex-none`}
                >
                  <Image
                    src={url}
                    alt="post"
                    width={200}
                    height={200}
                    className="absolute"
                  />

                  <div
                    className="w-[25px] h-[25px] rounded-full bg-slate-300 text-white flex justify-center items-center text-xs absolute right-3 top-3 hover:cursor-pointer hover:bg-stone-800"
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
            className={`w-[200px] h-[200px] border bottom-2 rounded-md flex justify-center items-center`}
          >
            <label className="w-[100vw] max-w-[300px] h-[100%] flex justify-center items-center">
              <Image
                src={plus}
                alt="back to main page"
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
        <div className="w-[90vw] h-[90vh] fixed top-4 left-0 right-0 mx-auto bg-white">
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
