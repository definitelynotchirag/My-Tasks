import { connect } from "@/dbConfig/dbConfig";
import React from "react";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody)

    const user = await User.findOne({
      email: email
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User Does Not Exist",
        },
        { status: 500 }
      );
    }

    const iscorrect = await bcryptjs.compare(password, user.password);
    if (!iscorrect) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }

    const tokendata = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(tokendata, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json(
      { message: "Login Successful" , token},
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;

  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
