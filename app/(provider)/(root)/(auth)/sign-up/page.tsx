"use client";

import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/auth.store";
import { useRouter } from "next/navigation";
import { ComponentProps, useState } from "react";
import Page from "../../_components/Page/page";
import DefaultButton from "../_components/DefaultButton";
import InputField from "../_components/InputField";

function SignUpPage() {
  const router = useRouter();

  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSubmitForm: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();

    if (!email || !password || !rePassword)
      return alert("Please fill in all fields");
    if (!email.includes("@") || !email.includes("."))
      return alert("Invalid email format");
    if (!(password.length && rePassword.length > 7))
      return alert("Password must be at least 8 characters long");
    if (password !== rePassword) return alert("Passwords do not match");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.log("sign-up error", error);
      return alert("Sign-up failed. Please try again");
    }
    // 닉네임 user 테이블에 insert하기

    setIsLoggedIn(true);
    router.push("/");
    alert("Sign-up successful! Welcome!");
  };

  return (
    <Page
      title="Sign Up"
      subtitle="Create an account to start your journey with us!"
    >
      <form
        className="flex flex-col gap-y-8 m-auto w-[480px]"
        onSubmit={handleSubmitForm}
      >
        <InputField
          value={email}
          change={setEmail}
          label={"Email"}
          type={"email"}
          id={"email"}
        />

        <InputField
          value={nickname}
          change={setNickname}
          label={"Nickname"}
          type={"text"}
          id={"nickname"}
        />

        <InputField
          value={password}
          change={setPassword}
          label={"Password"}
          type={"password"}
          id={"password"}
        />
        <InputField
          value={rePassword}
          change={setRePassword}
          label={"Re-enter Password"}
          type={"password"}
          id={"rePassword"}
        />

        <DefaultButton>Sign Up</DefaultButton>
      </form>
    </Page>
  );
}

export default SignUpPage;