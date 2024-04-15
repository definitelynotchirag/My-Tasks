"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import router from "next/navigation";
import Tasks from "../components/tasks";
import toast from "react-hot-toast";
import { NextResponse } from "next/server";
import { Cross } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function homePage() {
  const [user, setUser] = useState({
    user_id: "",
    tasklist: [],
  });

  const [usertask, setusertask] = useState({
    tasks: "",
    desc: "",
  });

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

  const tasklist = user.tasklist;
  useEffect(() => {
    getUser();
  }, []);

  const deladdtasks = async () => {
    try {
      // console.log(user)
      const response = await axios.post("/api/tasks/delalltasks", {user});
      // console.log(response)
    } catch (error: any) {
        toast.error(error.message)
    }
  };

  const addtasks = async (e:any) => {
    // getUser();
    try {
      // console.log({user,usertask})
      //   e.preventDefault();
      const response = await axios.post("/api/tasks/addtasks", {
        user,
        usertask,
      });
      // console.log(response);
      setusertask({
        tasks: "",
        desc: "",
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  //   console.log(tasklist);

  return (
    <div>
      <span>
        <h1>MyTasks</h1>
        {tasklist?.map((tasklist) => (
          <Tasks user={user} tasks={(tasklist as any)?.tasks} desc={(tasklist as any)?.desc} />
        ))}
        <form>
          <Input
            id="usertask"
            type="text"
            placeholder="Enter Task"
            value={usertask.tasks}
            onChange={(e) => {
              setusertask({ ...usertask, tasks: e.target.value });
            }}
            onClick={getUser}
          />

          <Button type="submit" onClick={addtasks} onClickCapture={getUser}>
            <Cross />
          </Button>
          <br/>
          <Button onClick={deladdtasks}>Clear</Button>
        </form>
        <hr />
        

        <hr />
        <Button>Logout</Button>
      </span>
    </div>
  );
}
