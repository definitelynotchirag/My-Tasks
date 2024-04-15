import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";


export const getChecked = async(user:any, task:any) => {
    const userr = await User.findById(user.user_id);
    const tasksnow = userr.tasklist.find((o:any)=>{o.tasks === task})
    const isChecked = tasksnow.isChecked;
    return isChecked;
}