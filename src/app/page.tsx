"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/navigation";
import Tasks from "./components/tasks";
import toast from "react-hot-toast";
import { NextResponse } from "next/server";
import { Cross } from "lucide-react";
import classes from './home.module.css'
import { useContext } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import {
  Button,
  Anchor,
  Input,
  PasswordInput,
  InputWrapper,
} from "@mantine/core";


export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState({
    user_id: "",
    tasklist: [],
  });
  

  const [usertask, setusertask] = useState({
    tasks: "",
    desc: "",
    isChecked: false,
  });

  
  const tasklist = user.tasklist;
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("/api/users/home");
        //   console.log("no");
        //   console.log(response.data);
        // console.log(response.data.data.tasklist)
  
        const newUser = setUser({
          ...user,
          user_id: response.data.data._id,
          tasklist: response.data.data.tasklist,
        });
  
        //   console.log(newUser)
      } catch (error: any) {
        console.log(error.message);
        toast.error(error.message);
      }
    };
    getUser();
  }, [usertask]);

  const deladdtasks = async () => {
    try {
      // console.log(user)
      const response = await axios.post("/api/tasks/delalltasks", { user });
      setusertask({
        tasks: "",
        desc: "",
        isChecked: false,
      });
      // console.log(response)
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const addtasks = async (e: any) => {
    // getUser();
    try {
      // console.log({user,usertask})
      e.preventDefault();
      setusertask({
        tasks: "",
        desc: "",
        isChecked: false,
      });
      const response = await axios.post("/api/tasks/addtasks", {
        user,
        usertask,
      });
      // document.getElementById("usertask").value = "";
      // $("#submitForm").val("");

      // console.log(response);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const onlogout = async () => {
    try {
      const response = await axios.get('/api/users/logout')
      toast.success("Logout Successful");
      router.push('/login')
      
    } catch (error:any) {
      toast.error(error.message);
      
    }
  }

  // const incompletetasks = tasklist?.filter((tasklist) => (tasklist as any).isChecked === false)
  // const completetasks = tasklist?.filter((tasklist) => (tasklist as any).isChecked === true)
  //   console.log(tasklist);

  return (
    <div>
      <div className="flex justify-between align-middle pb-2">
        <h1 className="text-white text-2xl">MyTasks</h1>
        <Button
          size="compact-sm"
          variant="filled"
          color="rgba(39,0,87,1)"
          radius="sm"
          onClick={onlogout}
        >
          Logout
        </Button>
      </div>
      {/* <h2>InComplete</h2> */}
      <div className="container bg-[#181818] rounded-lg p-4 mx-auto">
      <div className="overflow-y-auto max-h-36 p-2 pb-2 scroll-m-0">
      {tasklist?.map((tasklist) => (
        <Tasks
          key={user.user_id}
          user={user}
          tasks={(tasklist as any)?.tasks}
          desc={(tasklist as any)?.desc}
          isChecked={(tasklist as any)?.isChecked}
        />
      ))}
      </div>
      <form onSubmit={addtasks}>
        <div className="flex justify-between align-middle p-2">
          <div className="p-2">
            <Input
              id="usertask"
              type="text"
              radius="md"
              variant="filled"
              color="purple"
              classNames={{input:classes.input}}
              placeholder="Enter Task"
              value={usertask.tasks}
              onChange={(e) => {
                setusertask({ ...usertask, tasks: e.target.value });
              }}
              // onSubmit={}
            />
          </div>

          <div className="p-2">
            <Button
              type="submit"
              radius="md"
              variant="filled"
              color="rgba(39,0,87,1)"
            >
              <Cross />
            </Button>
          </div>
        </div>

        <div className="text-center p-1">
          <Button
            type="reset"
            radius="md"
            variant="filled"
            color="rgba(39,0,87,1)"
            onClick={deladdtasks}
          >
            Clear
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
}
