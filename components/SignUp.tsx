"use client";
import React, { useRef } from "react";
// import { auth } from "../utils/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  //   const auth = getAuth();
  //   const emailRef = React.useRef<HTMLInputElement>(null);
  //   const passwordRef = React.useRef<HTMLInputElement>(null);

  //   const handleSignUp = (event: React.FormEvent) => {
  //     event.preventDefault();

  //     if (emailRef.current?.value && passwordRef.current?.value) {
  //       createUserWithEmailAndPassword(
  //         auth,
  //         emailRef.current.value,
  //         passwordRef.current.value
  //       )
  //         .then((userCredential) => {
  //           // Signed in
  //           const user = userCredential.user;
  //           console.log(user, userCredential);
  //         })
  //         .catch((error) => {
  //           const errorCode = error.code;
  //           const errorMessage = error.message;
  //         });
  //     }
  //   };

  return (
    <div>
      <p>我要註冊</p>
      <form
        action=""
        onSubmit={(e) => {
          //   handleSignUp(e);
        }}
      >
        <div>
          <label htmlFor="">帳號</label>
          <input type="email" />
        </div>
        <div>
          <label htmlFor="">密碼</label>
          <input type="password" />
        </div>
        <button>登入</button>
      </form>

      <div>或</div>
      <div>使用 Facebook 帳號註冊</div>
      <div>使用 Google 帳號註冊</div>
    </div>
  );
};

export default SignUp;
