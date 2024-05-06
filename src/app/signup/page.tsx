"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  Button,
  Anchor,
  Input,
  PasswordInput,
  InputWrapper,
} from "@mantine/core";
import classes from "./page.module.css";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    tasklist: [],
  });
  const [buttondisabled, setbuttondisabled] = useState(true);

  const OnSignUp = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      router.push("/home");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.password.length > 5 &&
      user.email.length > 0
    ) {
      setbuttondisabled(false);
    } else {
      setbuttondisabled(true);
    }
  }, [user]);

  return (
    <div className="text-center">
      <h1 className="text-center text-xl text-white p-4">MyTasks</h1>
      <div className="text-center p-1">
        <label className="text-white p-1">Email</label>
        <Input
          id="email"
          type="email"
          radius="md"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
      </div>
      <div className="text-center p-1">
        <label className="text-white">Username</label>
        <Input
          id="username"
          type="text"
          radius="md"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
        />
      </div>
      <div className="text-center p-1">
        <label className="text-white">Password</label>
        <PasswordInput
          id="password"
          type="password"
          radius="md"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
      </div>

      <div className="text-center p-4">
        {buttondisabled ? (
          <Button disabled radius="md" className={classes.button}>
            Disabled
          </Button>
        ) : (
          <Button
            variant="filled"
            color="rgba(39,0,87,1)"
            radius="md"
            onClick={OnSignUp}
          >
            Signup
          </Button>
        )}
      </div>
      {/* <Link href={"/login"}>Already Have An Account?</Link> */}
      <div className="text-center ">
      <Anchor href="/login" underline="hover" size="sm" c="rgba(39,0,87,1)">
      Already Have An Account?
      </Anchor>
      </div>
    </div>
  );
}
