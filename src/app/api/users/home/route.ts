import { getDataFromToken } from "@/helpers/getDataFromToken";
import axios from "axios";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const user_id = await getDataFromToken(request);
    // console.log(user_id)
    const res = await User.findOne({ _id: user_id }).select("-password");
    // console.log(res);
    return NextResponse.json({message:"Done",data : res});

  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 400 }
    );
  }
}
