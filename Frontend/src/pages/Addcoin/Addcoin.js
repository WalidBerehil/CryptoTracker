
import axios from 'axios';
import React ,{useState} from 'react'
import {useHistory} from "react-router-dom";
import NavbarComponent from '../../component/Navbar/NavbarComponent';



function Addcoin() {
    const [name,setName]=useState("")
    const [coinselec,setCoinselec]=useState("")
    let history = useHistory();


   async function Valider()
    {
        let x = localStorage.getItem('user-token');
        x = x.substr(1,x.length-2)

        const config = {
            headers: {
                Authorization: 'Bearer ' + x
            }
        }
       let item={name,name,coinselec} 
       console.warn(item)

    //    let result= await fetch("http://localhost:5000/mypost",config{
    //        method: 'POST',
    //        body: JSON.stringify(item),
    //        headers: {
    //            "Content-Type":'application/json',
    //            "Accept":'application/json'
    //        }

    //    })
       const newCoin = {
        title: coinselec,
        body : coinselec,
        amount : name
      };

       axios.post('http://localhost:5000/createpost',newCoin, config).then(res => {
                
        console.log(res);
        history.push("/profile");
    }).catch(error => console.error(error));

    //    result = await result.json()
    //    console.warn("result",result)
    //    console.log(result)
    //    history.push("/profile");
    }


    return (
        <div> 
            <NavbarComponent/>
        <div  align="center">
            <h1> Form Add Post</h1>
            <br/><br/>
             <form>

             <input type="text" required 
               value={name}
               onChange={(e)=>setName(e.target.value)}
               placeholder="quantity"/>
               <br/><br/>
                 <select 
                 value={coinselec}
               onChange={(e)=>setCoinselec(e.target.value)}> 
                 <option value="bitcoin">Bitcoin</option>
                 <option value="ethereum">Ethereum</option>
                 <option value="tether">Tether</option>
                <option value="binancecoin">Binance coin</option>
                <option value="solana">Solana</option>
                <option value="cardano">Cardano</option>
                     
                      </select>
                      
               
               
             
               <br/><br/>
               
               <br/><br/>
               <button type="button" className="add-input"  onClick={Valider}> Valider</button>
               </form>
            
        </div>
        </div>
    )
}

export default Addcoin
