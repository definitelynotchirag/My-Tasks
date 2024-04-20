import axios from "axios";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { user, tasks } = reqBody;
    const userr = await User.findById(user.user_id);
    // console.log(userr.tasklist)
    // console.log(tasks)
    const tasksnow = userr.tasklist.find((o: any) => {
      // console.log(o.tasks)
      // console.log(tasks)
      if( o.tasks === tasks){
        return o;
      }
       
    });
    // console.log(tasksnow);
    const isChecked = tasksnow.isChecked;
    // console.log(isChecked)
    return NextResponse.json({data: isChecked, message:"Done"});

  } catch (error: any) {
    // console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
