"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { collection, doc } from "firebase/firestore";
import { storage, db } from "@/utils/database";
import {
  useHMSActions,
  useHMSStore,
  useVideo,
  selectPeers,
} from "@100mslive/react-sdk";
import { useAppSelector } from "@/redux/hooks";
import { UserDataType } from "@/utils/type";
import ControlBar from "@/components/live-stream/ControlBar";

const PreviewRoom = ({
  hostAuthToken,
  userData,
}: {
  hostAuthToken: string;
  userData: UserDataType;
}) => {
  const uid = useAppSelector((state) => state.user.uid);
  const [title, setTitle] = useState<string>("");
  const [coverUrl, setCoverUrl] = useState<string>("");
  const peers = useHMSStore(selectPeers);
  const hostVideoTrack = peers.filter((peer) => peer.roleName === "host");
  const hmsActions = useHMSActions();
  const { videoRef } = useVideo({
    trackId: hostVideoTrack[0]?.videoTrack,
  });

  const uploadCoverImage = async (file: File) => {
    if (file) {
      try {
        const randomId = doc(collection(db, "temp")).id;
        const mountainsRef = ref(storage, `/${uid}/liveStream/${randomId}`);
        await uploadBytes(mountainsRef, file);
        const url = await getDownloadURL(mountainsRef);
        setCoverUrl(url);
      } catch (error) {
        window.alert("請重新上傳圖片123");
        console.error(error);
      }
    }
  };

  const hostLiveStreamConfig = useMemo(
    () => ({
      userName: userData.name,
      authToken: hostAuthToken,
      settings: {
        isAudioMuted: false,
        isVideoMuted: false,
      },
      metaData: JSON.stringify({
        name: userData.name,
        profile: userData.profileImg,
        theme: title,
        cover: coverUrl,
      }),
      rememberDeviceSelection: true,
    }),
    [userData.name, hostAuthToken, userData.profileImg, title, coverUrl]
  );

  const previewLiveStream = useCallback(async () => {
    await hmsActions.preview(hostLiveStreamConfig);
  }, [hmsActions, hostLiveStreamConfig]);

  const onJoinClick = async () => {
    if (!title && !coverUrl) {
      window.alert("尚未輸入直播標題及直播封面圖");
    } else if (!title) {
      window.alert("尚未輸入直播標題");
    } else if (!coverUrl) {
      window.alert("尚未增加直播封面圖");
    } else {
      await hmsActions.join(hostLiveStreamConfig);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      previewLiveStream();
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [previewLiveStream]);

  return (
    <div className="relative">
      <div className="relative after:bg-themePink-300 after:w-[100vw] after:h-[100vh] after:absolute after:opacity-10 after:top-0">
        {peers.length > 0 ? (
          <div>
            <video
              ref={videoRef}
              autoPlay
              className="w-[100vw] h-[100vh] object-cover -scale-x-100"
            />
            <ControlBar />
          </div>
        ) : (
          <div className="w-[100vw] h-[100vh] bg-gradient-to-tl from-[#fae8e6] from-10% via-[#F9D1BA] via-30% to-[#e48d85] to-80% object-cover flex flex-col items-center gap-5">
            <div
              onClick={previewLiveStream}
              className="text-white text-[20px] z-40 mt-[13vh] mb-[30px]"
            >
              預覽畫面載入中...
            </div>
            <div className="w-[100px] h-[100px] relative rounded-full border-2 p-[20px] border-themePink-400">
              {userData.profileImg && (
                <Image
                  src={`${userData.profileImg}`}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-full"
                  priority={true}
                />
              )}
            </div>
          </div>
        )}
      </div>

      <div className="liveStreamInputWrapper">
        <div className="liveStreamTitleDiv">
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className={`liveStreamTitleInput bg-opacity-50 ${
              peers.length > 0
                ? "bg-black text-white placeholder:text-white"
                : "bg-white text-themePink-700 placeholder:text-themeGray-400"
            }`}
            placeholder="輸入直播主題..."
            required
          />
        </div>

        <div className="liveStreamCoverDiv">
          {coverUrl ? (
            <div className="liveStreamCoverImageWrapper">
              <Image
                src={coverUrl}
                alt="live stream cover image"
                fill
                className="rounded-lg object-cover object-center"
              />
              <label className="text-[14px]  text-white flex items-center absolute bottom-2 right-2">
                <div className="text-[12px] text-center bg-black px-[10px] py-[3px] bg-opacity-30 rounded-xl">
                  修改
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      uploadCoverImage(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div
              className={`liveStreamCoverImageWrapper bg-opacity-40 rounded-lg ${
                peers.length > 0 ? "bg-black" : "bg-white"
              }`}
            >
              <label
                className={`w-[100%] h-[100%] text-[12px] flex flex-col items-center justify-center gap-2 ${
                  peers.length > 0 ? "text-white" : "text-themeGray-700"
                }`}
              >
                <p>＋</p>
                <p>新增封面</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      uploadCoverImage(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                  required
                />
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="w-[95vw] flex justify-center items-center gap-5 fixed bottom-5 left-0 right-0 mx-auto">
        <div
          onClick={onJoinClick}
          className="w-[90%] h-[50px] text-[14px] text-white bg-themePink-400 rounded-full flex justify-center items-center p-2 cursor-pointer hover:bg-darkPink md:w-[50vw] md:max-w-[600px] md:fixed md:bottom-[35px]"
        >
          開始直播
        </div>
      </div>
    </div>
  );
};

export default PreviewRoom;
