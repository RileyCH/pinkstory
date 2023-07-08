"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { collection, doc } from "firebase/firestore";
import { storage, db } from "@/utils/database";
import {
  useHMSActions,
  useHMSStore,
  useVideo,
  selectIsConnectedToRoom,
  selectPeers,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
} from "@100mslive/react-sdk";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { fetchData } from "@/redux/features/userDataSlice";
import Viewers from "@/components/live-stream/Viewers";
import Message from "@/components/live-stream/Message";

const HostRoom = () => {
  const uid = useAppSelector((state) => state).user.uid;
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state).fetchUser;
  const [hostAuthToken, setHostAuthToken] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [coverImage, setCoverImage] = useState<File>();
  const [coverUrl, setCoverUrl] = useState<string>("");

  const uploadCoverImage = async () => {
    if (coverImage) {
      try {
        const randomId = doc(collection(db, "temp")).id;
        const mountainsRef = ref(storage, `/${uid}/liveStream/${randomId}`);
        await uploadBytes(mountainsRef, coverImage);
        const url = await getDownloadURL(mountainsRef);
        setCoverUrl(url);
      } catch (error) {
        window.alert("請重新上傳圖片123");
        console.error(error);
      }
    }
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const peers = useHMSStore(selectPeers);
  const hostVideoTrack = peers.filter((peer) => peer.roleName === "host");
  const hmsActions = useHMSActions();
  const { videoRef } = useVideo({
    trackId: hostVideoTrack[0]?.videoTrack,
  });

  const hostLiveStreamConfig = {
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
    }),
    rememberDeviceSelection: true,
  };

  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const toggleAudio = async () => {
    await hmsActions.setLocalAudioEnabled(!isLocalAudioEnabled);
  };
  const toggleVideo = async () => {
    await hmsActions.setLocalVideoEnabled(!isLocalVideoEnabled);
  };

  const switchCamera = async () => {
    await hmsActions.switchCamera();
  };

  const previewLiveStream = async () => {
    await hmsActions.preview(hostLiveStreamConfig);
  };

  const onJoinClick = async () => {
    await hmsActions.join(hostLiveStreamConfig);
  };

  const leaveRoom = () => {
    hmsActions.leave();
  };
  useEffect(() => {
    const getAuthToken = async () => {
      const token = await hmsActions.getAuthTokenByRoomCode({
        roomCode: userData.liveStream.hostRoomCode,
      });
      setHostAuthToken(token);
    };
    getAuthToken();
  }, [hmsActions, userData.liveStream.hostRoomCode]);

  return (
    <div>
      <div>
        <div>
          <label htmlFor="">輸入直播主題</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 w-[150px]"
          />
        </div>
        <div>
          <label htmlFor="">新增直播封面</label>
          {coverUrl && <Image src={coverUrl} alt="" width={200} height={200} />}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setCoverImage(e.target.files[0]);
              }
            }}
          />
        </div>
        <div onClick={uploadCoverImage} className="w-[100px] bg-gray-400 mb-3">
          上傳圖片
        </div>

        <div onClick={previewLiveStream} className="w-[100px] bg-gray-400">
          預覽
        </div>
        <div onClick={onJoinClick}> 開啟直播</div>
      </div>
      <div className="flex gap-4">
        <div onClick={toggleVideo}>關閉鏡頭</div>
        <div onClick={toggleAudio}>關閉聲音</div>
        <div onClick={switchCamera}>切換鏡頭</div>
        <div onClick={leaveRoom}>結束直播</div>
      </div>

      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-[100vw] h-[80vh] object-cover border border-black -scale-x-100 mb-5"
        ></video>
      </div>

      {/* <div className="absolute top-10 left-2 flex gap-3">
        <p onClick={onJoinClick} className="bg-slate-200 p-[15px]">
          開啟直播
        </p>
        <p onClick={leaveRoom} className="bg-slate-200 p-[15px]">
          結束直播
        </p>
        <Viewers />
        <Message />
      </div> */}
    </div>
  );
};

export default HostRoom;
