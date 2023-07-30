import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/database";

const SignUp = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user, userCredential);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };
  console.log(email);

  return (
    <div>
      <p>我要註冊</p>
      <form
        onSubmit={(e) => {
          handleSignUp(e);
        }}
      >
        <div>
          <label htmlFor="">帳號</label>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="text-themePink-400"
          />
        </div>
        <div>
          <label htmlFor="">密碼</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="text-themePink-400"
          />
        </div>
        <button>註冊</button>
      </form>

      <div>或</div>
      <div>使用 Facebook 帳號註冊</div>
      <div>使用 Google 帳號註冊</div>
    </div>
  );
};

export default SignUp;
