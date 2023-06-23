"use client";
import React, { useState } from "react";
import SignUp from "./SignUp";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { loginUser } from "@/redux/features/signup/loginSlice";

const NativeLogin = () => {
  const [signUp, setSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email: email, password: password }));
  };

  return (
    <div className="w-[360px] h-[450px] bg-slate-200 rounded-[10px] m-auto">
      {!signUp ? (
        <div>
          <p>我要登入</p>
          <form action="" onSubmit={handleSignUp}>
            <div>
              <label htmlFor="">帳號</label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <label htmlFor="">密碼</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button>登入</button>
          </form>
          <div>或</div>
          <div>使用 Facebook 帳號登入</div>
          <div>使用 Google 帳號登入</div>
          <div onClick={() => setSignUp(true)}>建立帳戶</div>
        </div>
      ) : (
        <SignUp />
      )}
    </div>
  );
};
export default NativeLogin;
