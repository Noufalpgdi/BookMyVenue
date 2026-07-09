import { useState } from "react";
import login from '../api/authApi';
import {useNavigate } from "react-router-dom";

function Login()
{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
    const handleLogin= async()=>{
        try
        {
            const result = await login(email, password);
            localStorage.setItem("token",result.token);
            localStorage.setItem("user",JSON.stringify(result.user));
            console.log("Login Success");
            navigate("/venues");
        }
        catch(error)
        {
            console.log(error.response?.data || error.message);
        }
        
    };
    return(
        <div>
            <h1>Login Page</h1>
            <input type="text" placeholder="Enter the Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
            <br/>
            <input type="password" placeholder="Enter the password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
            <br/>
            <br/>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
