
import NavbarComponent from '../../component/Navbar/NavbarComponent';
import React ,{useState} from 'react'
import {useHistory} from "react-router-dom";
import { useForm } from "react-hook-form";



function Register()
 {
     let history = useHistory();
     
     const [name,setName]=useState("")
     const [password,setPassword] = useState("")
     const [email,setEmail]=useState("")

     async function signUP()
     {
        let item={name,password,email} 
        console.warn(item)

        let result= await fetch("http://localhost:5000/signup",{
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-Type":'application/json',
                "Accept":'application/json'
            }

        })
        result = await result.json()
        console.warn("result",result)
        console.log(result)
        history.push("/login");
     }

    return (
        <div>
            <NavbarComponent />
           <div align="center">
               <h1>Register Page</h1>
               <form>
               <input type="text" required 
               value={name}
               onChange={(e)=>setName(e.target.value)}
               placeholder="name"/>
               <br/><br/>
               <input type="password" required 
               value={password} 
               onChange={(e)=>setPassword(e.target.value)}
               placeholder="password"/>
               <br/><br/>
               <input type="email" required 
               value={email}
               onChange={(e)=>setEmail(e.target.value)}
               placeholder="email"/>
               <br/><br/>
               <button onClick={signUP}>Sign Up</button>
               </form>

           </div>
        </div>
    )
}
//onClick={() => {
                //    history.push("/login");}}
export default Register
