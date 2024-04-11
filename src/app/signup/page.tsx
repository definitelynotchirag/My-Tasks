"use client"
import { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import Link from "next/link";


export default function SignUpPage(){
    const router = useRouter();
    const [user,setUser] = useState({
        email: "",
        username: "",
        password:"",
        tasklist:[]
    })
    const [buttondisabled, setbuttondisabled] = useState(true);

    const OnSignUp = async () => {
        try {
            const response = await axios.post('/api/users/signup',user);
            router.push('/login');
        } catch (error:any) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        if(user.username.length > 0 && user.password.length > 5 && user.email.length > 0){
            setbuttondisabled(false);
        }else{
            setbuttondisabled(true);
        }
    },[user])

    return(
        <div>
            <h1>MyTasks</h1>
            <h1>SignUp</h1>
            <label>Email</label>
            <input
            id = 'email'
            type="email"
            value = {user.email}
            onChange={(e) => setUser({...user, email:e.target.value})}
            placeholder="Email"
            />
            <br/>
            <label>Username</label>
            <input
            id = 'username'
            type="text"
            value= {user.username}
            onChange={(e) => setUser({...user, username:e.target.value})}
            placeholder="Username"
            />
            <br/>
            <label>Password</label>
            <input
            id = 'password'
            type="password"
            value = {user.password}
            onChange={(e) => setUser({...user, password:e.target.value})}
            placeholder="Password"
            />
            <br/>
            <button onClick={OnSignUp}>{buttondisabled ? "Disabled" : "Signup"}</button>
            <br/>
            <Link href={'/login'}>Already Have An Account?</Link>
        </div>
    )
}