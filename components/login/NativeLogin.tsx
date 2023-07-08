"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SignUp from "@/components/login/SignUp";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { loginUser } from "@/redux/features/signup/loginSlice";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/database";
import emailIcon from "@/public/login/email.png";
import passwordIcon from "@/public/login/padlock.png";
import facebook from "@/public/login/facebook.png";
import google from "@/public/login/google.png";

const NativeLogin = () => {
  const [signUp, setSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email: email, password: password, uid: "" }));
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push(`main/${user.uid}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const checkUid = localStorage.getItem("uid");
    if (checkUid) {
      dispatch(loginUser({ uid: checkUid, email: "", password: "" }));
      router.push(`main/${checkUid}`);
    }
  }, [dispatch, router]);

  return (
    <>
      {!user.loginStatus && (
        <div className="nativeLoginArea">
          {!signUp ? (
            <div className="h-[90vh] md:h-[85vh] 2xl:h-[75vh] flex flex-col justify-between">
              <div className="mb-[10px]">
                <h1 className="text-[42px] md:text-[72px] 2xl:text-[96px] font-black tracking-widest mb-2 text-mainPink">
                  PinkStory
                </h1>
                <h2 className="text-[18px] md:text-[24px] 2xl:text-[36px]">
                  Enrich your life, <br />
                  anytime, anywhere.
                </h2>
              </div>
              <div>
                <form onSubmit={handleLogin} className="mb-[20px] md:mb-[30px]">
                  <div className="loginInputDiv">
                    <div className="absolute left-7 md:left-10">
                      <Image src={emailIcon} alt="login account" width={20} />
                    </div>
                    <input
                      type="email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="loginInput"
                    />
                  </div>

                  <div className="loginInputDiv">
                    <div className="absolute left-7 md:left-10">
                      <Image
                        src={passwordIcon}
                        alt="login password"
                        width={20}
                      />
                    </div>
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="loginInput"
                    />
                  </div>

                  <button className="w-[270px] xl:w-[490px] bg-mainPink text-[14px] hover:bg-amber-600 py-[10px] rounded-full cursor-pointer">
                    登入
                  </button>
                </form>
                <p className="text-[14px] mb-[20px] md:mb-[30px] relative textOr">
                  或
                </p>
                <div className="thirdLoginDiv">
                  <div>
                    <Image src={facebook} alt="login account" width={20} />
                  </div>
                  <p>Facebook 登入</p>
                </div>
                <div className="thirdLoginDiv">
                  <div>
                    <Image src={google} alt="login account" width={15} />
                  </div>
                  <p>Google 登入</p>
                </div>
                <div
                  onClick={() => setSignUp(true)}
                  className="w-[270px] text-[14px] mx-auto cursor-pointer"
                >
                  建立帳戶
                </div>
              </div>
            </div>
          ) : (
            <SignUp />
          )}
        </div>
      )}
    </>
  );
};
export default NativeLogin;
