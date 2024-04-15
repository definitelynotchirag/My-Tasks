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
    const tasksnow = userr.tasklist.find((o: any) => {
      o.tasks === tasks;
    });
    const isChecked = tasksnow.isChecked;
    return NextResponse.json({data: isChecked, message:"Done"});

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
