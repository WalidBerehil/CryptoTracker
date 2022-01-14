import React from 'react'

import './Coinsprofile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const Coinsprofile
 = ({
    
    name,
    idPost,
    image,
    symbol,
    priceChange,
    price,
    userquantity,
    totalprice

    
    
} )=> {
     
    
    

     const deletePost = (id) =>{
      

            let x = localStorage.getItem('user-token');
            x = x.substr(1,x.length-2)
    
            const config = {
                headers: {
                    Authorization: 'Bearer ' + x
                }
            }
            if(window.confirm('Are you sure ?'))
            {
                axios.delete('http://localhost:5000/deletepost/'+id, config).then(res => {
                
                    console.log(res);
                    window.location.reload();
                }).catch(error => console.error(error));
            }
        } 




    
    
    return (
        

   
        <div className="col-md-3">
            <div className="card p-2 py-3 text-center">
                <div className="img mb-2"> <img alt="coin" src={image} width="70" className="rounded-circle"/> </div>
                <h5 className="mb-0">{symbol}</h5> <small>{name}</small>
                <div className="ratings">{price} </div>
                <div className="ratings">{userquantity} </div>
                <div className="ratings">{totalprice} </div>
                <div className="ratings">{
                priceChange < 0 ? (
                    <label className="coin-percent red">
                        {
                        priceChange.toFixed(2)
                    }%</label>
                ) : (
                    <p className="coin-percent green">
                        {
                        priceChange.toFixed(2)
                    }%</p>
                )
            }  </div>

<div className="mt-4 apointment"> <button className="btn btn-success text-uppercase" onClick={() => deletePost(idPost)}> Remove </button> </div>

            </div>
        </div>
        










  
    )
    
        }

export default Coinsprofile
