"use client";
import axios from "axios";
import Link from "next/link";
// import "../../globals.css";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Button,
  Anchor,
  Input,
  PasswordInput,
  InputWrapper,
} from "@mantine/core";
import classes from './page.module.css';

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
      // console.log(response.data);
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
      <h1 className="text-white text-xl text-center p-4">MyTasks</h1>
      <div className="p-1 text-center">
      <label className="text-white text-md p-1">Email</label>
        <Input
          variant="filled"
          radius="md"
          id="email"
          type="email"
          value={user.email}
          placeholder="Email"
          classNames={{input:classes.input}}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="p-1 text-center ">
      <label className="text-white text-md p-1">Password</label>
      <PasswordInput
        variant="filled"
        radius="md"
        id="password"
        type="password"
        value={user.password}
        classNames={{input:classes.input}}
        placeholder="Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
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
          onClick={onLogin}
        >
          Login
        </Button>
      )}
      </div>

      <div className="text-center ">
      <Anchor href="/signup" underline="hover" size="sm" c="rgba(39,0,87,1)">
        Don't Have a Account?
      </Anchor>
      </div>
    </div>
  );
};

export default LoginPage;
