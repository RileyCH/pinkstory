import { useState, useRef } from "react";
import Image from "next/image";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/database";
import axios from "axios";
import LoadingAnimation from "../LoadingAnimation";
import emailIcon from "@/public/login/email.png";
import passwordIcon from "@/public/login/padlock.png";
import userIcon from "@/public/login/user.png";
import calendar from "@/public/login/calendar.png";
import genderIcon from "@/public/login/gender.png";
import zodiacIcon from "@/public/login/zodiac.png";
import cool from "@/public/login/cool.png";

type SetSignUpAction = React.Dispatch<React.SetStateAction<boolean>>;
type RoomCodeType = {
  code: string;
  room_id: string;
  role: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
};

const SignUp = ({ setSignUp }: { setSignUp: SetSignUpAction }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [gender, setGender] = useState<string>("none");
  const [constellations, setConstellations] = useState<string>("none");
  const [selfIntro, setSelfIntro] = useState<string | null>(null);
  const [liveSteamRoomId, setLiveSteamRoomId] = useState<string | null>(
    "64c65559eba04ea8683df3cc"
  );
  const [hostRoomCode, setHostRoomCode] = useState<string | null>(
    "zgs-bcla-nfx"
  );
  const [guestRoomCode, setGuestRoomCode] = useState<string | null>(
    "gwu-zzwh-wdf"
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const birthDayRef = useRef<HTMLInputElement>(null);
  const zodiacSigns = [
    "牡羊座",
    "金牛座",
    "雙子座",
    "巨蟹座",
    "獅子座",
    "處女座",
    "天秤座",
    "天蠍座",
    "射手座",
    "摩羯座",
    "水瓶座",
    "雙魚座",
  ];

  const handleFocus = () => {
    if (birthDayRef.current) {
      birthDayRef.current.type = "date";
    }
  };
  const handleBlur = () => {
    if (birthDayRef.current) {
      birthDayRef.current.type = "text";
    }
  };

  const createLiveStreamRoom = async () => {
    if (userName) {
      await axios
        .post("/api/live-stream/create-room", { userName: userName })
        .then((res) => {
          setLiveSteamRoomId(res.data.id);
          return res.data.id;
        })
        .then((res) => {
          createRoomCode(res);
        });
    }
  };

  const createRoomCode = async (roomId: string) => {
    await axios
      .post("/api/live-stream/join-room", {
        roomId: roomId,
      })
      .then((res) => {
        const filteredHostRoomCode = res.data.data.filter(
          (room: RoomCodeType) => room.role === "host"
        )[0].code;
        const filteredGuestRoomCode = res.data.data.filter(
          (room: RoomCodeType) => room.role === "guest"
        )[0].code;
        const roomData = {
          filteredHostRoomCode: filteredHostRoomCode,
          filteredGuestRoomCode: filteredGuestRoomCode,
        };
        setHostRoomCode(filteredHostRoomCode);
        setGuestRoomCode(filteredGuestRoomCode);
        return roomData;
      });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      window.alert("請先輸入 email");
    }
    if (!password) {
      window.alert("請先輸入密碼");
    }
    if (!userName) {
      window.alert("請先輸入使用者名稱");
    }
    if (!birthDayRef.current) {
      window.alert("請先輸入生日");
    }
    if (gender === "none") {
      window.alert("請先選擇性別");
    }
    if (constellations === "none") {
      window.alert("請先選擇星座");
    }
    if (!selfIntro) {
      window.alert("請填入你的自我介紹～");
    }

    if (
      email &&
      password &&
      userName &&
      birthDayRef.current &&
      gender !== "none" &&
      constellations !== "none" &&
      selfIntro
    ) {
      setIsLoading(true);
      // await createLiveStreamRoom();
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          if (userCredential && birthDayRef.current) {
            const newUserId = userCredential.user.uid;
            const userData = {
              uid: newUserId,
              name: userName,
              birth: {
                date: Number(birthDayRef.current.value.split("-")[0]),
                month: Number(birthDayRef.current.value.split("-")[1]),
                year: Number(birthDayRef.current.value.split("-")[2]),
              },
              constellations: constellations,
              gender: gender,
              liveStream: {
                roomId: liveSteamRoomId,
                hostRoomCode: hostRoomCode,
                guestRoomCode: guestRoomCode,
              },
              introduction: selfIntro,
            };
            axios
              .post("/api/user-data/create", { user: userData })
              .then(() => setIsLoading(false));
          } else {
            window.alert("此帳戶已經存在，請直接登入");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="nativeLoginArea">
      <div className="mb-[20px] md:mb-[30px] xl:-[40px]">
        <p className="text-[32px] md:text-[48px] 2xl:text-[96px] font-black tracking-widest mb-2 text-themePink-400">
          Welcome!
        </p>
        <p className="text-[14px] font-semibold md:text-[18px]">
          輸入你的個性化內容，
          <br className="xl:hidden" />
          快速開啟 PinkStory 完整功能
        </p>
      </div>

      <form
        onSubmit={(e) => handleSignUp(e)}
        className="mb-[20px] md:mb-[30px]"
      >
        <div className="signUpInputDiv">
          <div className="absolute left-7 md:left-10">
            <Image src={emailIcon} alt="sign-up account" width={20} />
          </div>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="請輸入Email"
            className="signUpInput"
          />
        </div>
        <div className="signUpInputDiv">
          <div className="absolute left-7 md:left-10">
            <Image src={passwordIcon} alt="sign-up password" width={20} />
          </div>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="請輸入密碼"
            className="signUpInput"
          />
        </div>
        <div className="signUpInputDiv">
          <div className="absolute left-7 md:left-10">
            <Image src={userIcon} alt="sign-up password" width={20} />
          </div>
          <input
            type="text"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="請輸入使用者名稱"
            className="signUpInput"
          />
        </div>

        <div
          className="signUpInputDiv"
          onClick={() => {
            handleFocus();
            birthDayRef.current?.showPicker();
          }}
        >
          <div className="absolute left-7 md:left-10">
            <Image src={calendar} alt="sign-up password" width={20} />
          </div>
          <input
            type="text"
            ref={birthDayRef}
            onBlur={handleBlur}
            placeholder="請輸入生日"
            className="signUpInput no-calendar"
          />
        </div>

        <div className="signUpInputDiv">
          <div className="absolute left-7 md:left-10">
            <Image src={genderIcon} alt="sign-up password" width={20} />
          </div>
          <select
            className="signUpSelect text-[14px]"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="none">請選擇性別</option>
            <option value="male">男生</option>
            <option value="female">女生</option>
          </select>
        </div>

        <div className="signUpInputDiv">
          <div className="absolute left-7 md:left-10">
            <Image src={zodiacIcon} alt="sign-up password" width={20} />
          </div>
          <select
            className="signUpSelect text-[14px]"
            onChange={(e) => setConstellations(e.target.value)}
          >
            <option value="none">請選擇星座</option>
            {zodiacSigns.map((sign) => (
              <option key={sign} value={sign}>
                {sign}
              </option>
            ))}
          </select>
        </div>
        <div className="signUpInputDiv">
          <div className="absolute left-7 md:left-10">
            <Image src={cool} alt="sign-up password" width={20} />
          </div>
          <textarea
            cols={10}
            rows={1}
            onChange={(e) => {
              setSelfIntro(e.target.value);
            }}
            placeholder="輸入你獨特的自我介紹吧~"
            className="signUpInput resize-none"
          />
        </div>

        <button className="w-[270px] mt-[5px] bg-themePink-400 text-[14px] hover:bg-amber-600 py-[10px] rounded-full cursor-pointer xl:w-[490px]">
          {isLoading ? (
            <div className="flex justify-center">
              <LoadingAnimation />
            </div>
          ) : (
            "建立帳戶"
          )}
        </button>
      </form>

      <p className="text-[14px]">
        已經有帳號了嗎？{" "}
        <span
          onClick={() => setSignUp(false)}
          className="text-[14px] cursor-pointer text-themePink-400 font-medium"
        >
          點此登入
        </span>
      </p>
    </div>
  );
};

export default SignUp;
