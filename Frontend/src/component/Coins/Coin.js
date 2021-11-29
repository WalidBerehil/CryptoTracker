import React from 'react'
import './Coin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form} from 'react-bootstrap';

const Coin = ({
    name,
    image,
    symbol,
    price,
    volume,
    priceChange,
    marketcap
}) => {
    return (
        <tr>
            <Form></Form>
            <td><img src={image}
                    alt="crypto"/></td>
            <td>{name}</td>
            <td>{symbol}</td>
            <td>${price}</td>
            <td>${
                volume.toLocaleString('en-US')
            }</td>
            <td> {
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
            } </td>
            <td>${
                marketcap.toLocaleString('en-US')
            }</td>
        </tr>


    // <div className="coin-container">
    //     <div className="coin-row">
    //         <div className="coin">
    //             <img src={image} alt="crypto" />
    //             <h1>{name}</h1>
    //             <p className="coin-symbol">{symbol}</p>
    //         </div>
    //         <div className="coin-data">
    //             <p className="coin-price">${price}</p>
    //             <p className="coin-volume">${volume.toLocaleString('en-US')}</p>
    // {priceChange < 0 ? (
    //     <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
    // ) :  (
    //     <p className="coin-percent green">{priceChange.toFixed(2)}%</p>
    // )}
    //             <p className="coin-marketcap">
    //                 Mkt Cap : ${marketcap.toLocaleString('en-US')}
    //             </p>
    //         </div>
    //     </div>
    // </div>
    )
}

export default Coin
