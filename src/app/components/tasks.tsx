"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import axios from "axios";

export default function Tasks({
  user,
  tasks,
  desc,
}: {
  user: any;
  tasks: any;
  desc: any;
}) {
  const ondelete = () => {
    try {
      const response = axios.post("/api/tasks/deltask", { user, tasks });
      // console.log("Task deleted successfully")
      // console.log(response);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const oncheck = () => {
    try {
      console.log("Checked");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div>
      <Checkbox id="taskscheck" onCheckedChange={oncheck} />
      <label>{tasks}</label>
      <small>{desc}</small>
      <form>
        <Button>
          <CircleX onClick={ondelete} />
        </Button>
      </form>
    </div>
  );
}
