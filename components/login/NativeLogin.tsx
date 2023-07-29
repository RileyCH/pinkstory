"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SignUp from "@/components/login/SignUp";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/database";
import emailIcon from "@/public/login/email.png";
import passwordIcon from "@/public/login/padlock.png";
import facebook from "@/public/login/facebook.png";
import google from "@/public/login/google.png";

const NativeLogin = () => {
  const [signUp, setSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("test7@gmail.com");
  const [password, setPassword] = useState<string>("123123");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push(`main/${user.uid}`);
      })
      .catch((error) => {
        window.alert("請重新登入！");
        console.error(error);
      });
  };

  return (
    <>
      {
        <div className="nativeLoginArea">
          {!signUp ? (
            <div className="h-[90vh] md:h-[85vh] 2xl:h-[75vh] flex flex-col justify-between">
              <div className="mb-[10px]">
                <h1 className="text-[42px] md:text-[72px] 2xl:text-[96px] font-black tracking-widest mb-2 text-themePink-400">
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
                      defaultValue="test7@gmail.com"
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
                      defaultValue="123123"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="loginInput"
                    />
                  </div>

                  <button className="w-[270px] xl:w-[490px] bg-themePink-400 text-[14px] hover:bg-amber-600 py-[10px] rounded-full cursor-pointer">
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
      }
    </>
  );
};
export default NativeLogin;
