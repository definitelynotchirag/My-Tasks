import axios from "axios";
import { connect } from "@/dbConfig/dbConfig";
import React from "react";
import { NextResponse,NextRequest } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {user} = reqBody;
        user.tasklist.length = 0;
        // console.log(user.tasklist)
        // console.log(user);
        const newUser = await User.findByIdAndUpdate(user.user_id,{tasklist: user.tasklist})
        return NextResponse.json({message: "Cleared all tasks"})
        
    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status:400})
    }
}