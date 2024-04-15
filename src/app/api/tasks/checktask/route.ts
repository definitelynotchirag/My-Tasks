import removeByAttr from "@/helpers/findelement&del";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { user, tasks , Checked} = reqBody;

    // console.log(tasks)
    const updatedtask = user.tasklist.map((task:any) => {
      // console.log(task)
      if (task.tasks === tasks && Checked === true) {
        return { ...task, isChecked: true };
      }
      // if(task.tasks === tasks && task.isChecked === true){
      //     return { ...task, isChecked:false}
      // }
      else {
        return { ...task, isChecked: false };
      }
    });
    // console.log(updatedtask);
    const userr = await User.findByIdAndUpdate(user.user_id, {
      tasklist: updatedtask,
    });
    // console.log(userr)
    return NextResponse.json({ message: "Task Checked" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
