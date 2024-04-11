"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttondisabled, setbuttondisabled] = useState(true);

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);
      console.log(response.data);
      router.push("/");
    } catch (error: any) {
      toast.error("Error:", error.message);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 5) {
      setbuttondisabled(false);
    } else {
      setbuttondisabled(true);
    }
  }, [user]);

  return (
    <div>
      <h1>MyTasks</h1>
      <label>Email</label>
      <input
        id="email"
        type="email"
        value={user.email}
        placeholder="Email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label>Password</label>
      <input
        id="password"
        type="password"
        value={user.password}
        placeholder="Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button onClick={onLogin}>{buttondisabled ? "Disabled" : "Login"}</button>
      <Link href="/signup">Don't Have a Account?</Link>
    </div>
  );
};

export default LoginPage;
