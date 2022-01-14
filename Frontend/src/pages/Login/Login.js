import React, { useState } from 'react'
import {useHistory} from "react-router-dom";
import NavbarComponent from '../../component/Navbar/NavbarComponent';

function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const history = useHistory();
    
    if(localStorage.getItem('user-token'))
    {
        history.push("/profile");  
    }
    

async function login() {


    console.warn(email,password)
    let item={email,password};
    let result= await fetch("http://localhost:5000/signin",{
        method:'POST',
        headers: {
            "Content-Type":'application/json',
            "Accept":'application/json'
        },
        body:JSON.stringify(item)
    });
    result = await result.json();
    console.log("--------------------------------------------------")
    console.log(result);
    if(result.error)
    {console.log("3dna error");
alert("Invalid Email or password");}
    else{
        localStorage.setItem("user-token",JSON.stringify(result.token));
     history.push("/profile");
    }

    


}
    
    return (
        <div  align="center">
            <NavbarComponent />
           <h1> Login Page </h1><br />
 
           <div>
               <input type="text" placeholder="email"
               onChange={(e)=>setEmail(e.target.value)}
               />
               <br /><br />
               <input type="password" placeholder="password"
               onChange={(e)=>setPassword(e.target.value)}
               />
               <br /><br />
               <button onClick={login}> Login </button>

           </div>
        </div>
    )}


export default Login
