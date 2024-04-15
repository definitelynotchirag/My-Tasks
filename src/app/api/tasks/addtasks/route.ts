import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import React from "react";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { user, usertask } = reqBody;

    // console.log(usertask)
    const newlist = user.tasklist.push(usertask);
    // console.log(user)
    // console.log(usertask)
    const currentUser = await User.findByIdAndUpdate(user.user_id, {
      tasklist: user.tasklist,
    });
    console.log(currentUser);

    return NextResponse.json(
      { message: "Task Added Successfully" },
      { status: 500 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
