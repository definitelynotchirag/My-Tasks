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
    isChecked : false
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
  }, [usertask]);

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
      e.preventDefault();
      setusertask({
        tasks: "",
        desc: "",
        isChecked : false
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

  //   console.log(tasklist);
  const incompletetasks = tasklist?.filter((tasklist) => (tasklist as any).isChecked === false)
  const completetasks = tasklist?.filter((tasklist) => (tasklist as any).isChecked === true)
  return (
      
      <div >
      <span>
        <h1>MyTasks</h1>
        <span onMouseOver={getUser}>
        <h2>InComplete</h2>
        {incompletetasks?.map((tasklist) => (
          <Tasks user={user} tasks={(tasklist as any)?.tasks} desc={(tasklist as any)?.desc} isChecked = {(tasklist as any)?.isChecked} />
        ))}
        </span>
        <span onMouseOver={getUser}>
        <h2>Complete</h2>
        {completetasks?.map((tasklist) => (
          <Tasks user={user} tasks={(tasklist as any)?.tasks} desc={(tasklist as any)?.desc} isChecked = {(tasklist as any)?.isChecked} />
        ))}
        </span>
        <form onSubmit={addtasks}>
          <Input
            id="usertask"
            type="text"
            placeholder="Enter Task"
            value={usertask.tasks}
            onChange={(e) => {
              setusertask({ ...usertask, tasks: e.target.value });
            }}
            // onSubmit={}
            
            
          />

          <Button type="submit">
            <Cross />
          </Button>
          <br/>
          <Button onClick={deladdtasks}>Clear</Button>
        </form>
        <hr />
        

        <hr />
        <Button>Logout</Button>
      </span>
    
      
    </div  >
  );
}
