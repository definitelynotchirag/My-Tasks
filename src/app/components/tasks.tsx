"use client";
import React, { useEffect, useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
// import { Button } from "@/components/ui/button";
import classes from './tasks.module.css'
import { CircleX } from "lucide-react";
import { ArchiveX } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import axios from "axios";
import { getChecked } from "@/helpers/getChecked";
import {
  Button,
  Anchor,
  Input,
  PasswordInput,
  InputWrapper,
  Checkbox,
  createTheme,
  MantineProvider,
} from "@mantine/core";

const theme = createTheme({
  cursorType: "pointer",
});

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

  
  useEffect(() => {
    const oncheck = () => {
      try {
        const response = axios.post("/api/tasks/checktask", {
          user,
          tasks,
          Checked,
        });
        // console.log(response);
      } catch (error: any) {
        console.log(error.message);
        toast.error(error.message);
      }
    };
    oncheck();
  }, [Checked]);

  return (
    <div>
      <div className="flex justify-items-end justify-between align-middle p-2.5">
        <MantineProvider theme={theme}>
          <Checkbox
            id="taskscheck"
            color="rgba(39,0,87,1)"
            iconColor="white"
            size="sm"
            radius='sm'
            classNames={{input:classes.input}}
            onChange={(e) => setChecked(Checked ? false : true)}
            // onClick={oncheck}
            // // onChange={(e) => setChecked(true)}
            checked={Checked}
            label={<div className="text-white text-lg -m-1 pl-1">{tasks}</div>}
          />
        </MantineProvider>

        <div className="justify-self-end">
          <form>
          <Button
            size="compact-sm"
            variant="filled"
            color="rgba(39,0,87,1)"
            radius="sm"
          >
            <Trash2 size={17} onClick={ondelete} />
          </Button>
          </form>
        </div>

        {/* <label className="text-white p-3">{tasks}</label> */}
        {/* <form>
        <Button size="compact-sm"
          variant="filled"
          color="rgba(39,0,87,1)"
          radius="sm">
          <CircleX onClick={ondelete} />
        </Button>
      </form> */}
      </div>
    </div>
  );
}
