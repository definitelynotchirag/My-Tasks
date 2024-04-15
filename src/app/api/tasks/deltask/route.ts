import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import removeByAttr from "@/helpers/findelement&del";


connect(); 


// var removeByAttr = function(arr: any[], attr: string, value: any){
//     var i = arr.length;
//     while(i--){
//        if( arr[i] 
//            && arr[i].hasOwnProperty(attr) 
//            && (arguments.length > 2 && arr[i][attr] === value ) ){ 

//            arr.splice(i,1);

//        }
//     }
//     return arr;
// }
export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {user,tasks} = reqBody;
        // console.log(tasks)
        // const userr = await User.findOne({_id:user.user_id});
        const tasklist = user.tasklist;
        const newlist = removeByAttr(tasklist, 'tasks', tasks);
        // console.log(newlist)
        const newuser = await User.findByIdAndUpdate(user.user_id, {tasklist:newlist})
        // console.log(newuser)
        
        return NextResponse.json({message:"Tasks deleted Successfully"})

    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status: 400})
    }

}