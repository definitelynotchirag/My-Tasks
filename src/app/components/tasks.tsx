"use client";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import axios from "axios";
import { getChecked } from "@/helpers/getChecked";

export default function Tasks({
  user,
  tasks,
  desc,
  isChecked,
}: {
  user: any;
  tasks: any;
  desc: any;
  isChecked: any;
}) {
  // console.log(isChecked);
  const [Checked, setChecked] = useState(isChecked);
  
  const getCheck = async () => {
    try {
      const response = await axios.post("/api/tasks/getcheck", { user, tasks });
      // console.log(response);

      let ischedk = await response.data.data;
      setChecked(ischedk);

      return response.data.data;
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  // useEffect(() => {
  //   getCheck();
  // }, []);

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
      const response = axios.post("/api/tasks/checktask", {
        user,
        tasks,
        Checked,
      });
      console.log(response);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    oncheck();
  }, [Checked]);

  return (
    <div>
      <Checkbox
        id="taskscheck"
        onCheckedChange={(e) => setChecked(Checked ? false : true)}
        // onClick={oncheck}
        // // onChange={(e) => setChecked(true)}
        checked={Checked}
      />
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
