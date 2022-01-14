import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {useHistory} from "react-router-dom";
import NavbarComponent from '../../component/Navbar/NavbarComponent';


function Addcoin() {

    const [name, setName] = useState("")
    const [coinselec, setCoinselec] = useState("")
    let history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem('user-token')) {
            history.push("/login");
        }
    }, [history])


    async function Valider() {


        let x = localStorage.getItem('user-token');
        x = x.substr(1, x.length - 2)

        const config = {
            headers: {
                Authorization: 'Bearer ' + x
            }
        }


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
            body: coinselec,
            amount: name
        };

        axios.post('http://localhost:5000/createpost', newCoin, config).then(res => {

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
            <div align="center">
                <h1>
                    Form Add Post</h1>
                <br/><br/>
                <form>

                    <input type="text" required
                        value={name}
                        onChange={
                            (e) => setName(e.target.value)
                        }
                        placeholder="quantity"/>
                    <br/><br/>
                    <select value={coinselec}
                        onChange={
                            (e) => setCoinselec(e.target.value)
                    }>
                                           <option value="bitcoin">Bitcoin</option>
                        <option value="ethereum">Ethereum</option>
                        <option value="binancecoin">Binance Coin</option>
                        <option value="tether">Tether</option>
                        <option value="solana">Solana</option>
                        <option value="usd-coin">USD Coin</option>
                        <option value="cardano">Cardano</option>
                        <option value="ripple">XRP</option>
                        <option value="polkadot">Polkadot</option>
                        <option value="terra-luna">Terra</option>
                        <option value="dogecoin">Dogecoin</option>
                        <option value="avalanche-2">Avalanche</option>
                        <option value="shiba-inu">Shiba Inu</option>
                        <option value="matic-network">Polygon</option>
                        <option value="binance-usd">Binance USD</option>
                        <option value="crypto-com-chain">Crypto.com Coin</option>
                        <option value="chainlink">Chainlink</option>
                        <option value="near">Near</option>
                        <option value="wrapped-bitcoin">Wrapped Bitcoin</option>
                        <option value="cosmos">Cosmos</option>
                        <option value="terrausd">TerraUSD</option>
                        <option value="litecoin">Litecoin</option>
                        <option value="dai">Dai</option>
                        <option value="algorand">Algorand</option>
                        <option value="fantom">Fantom</option>
                        <option value="bitcoin-cash">Bitcoin Cash</option>
                        <option value="uniswap">Uniswap</option>
                        <option value="tron">TRON</option>
                        <option value="stellar">Stellar</option>
                        <option value="okb">OKB</option>
                        <option value="internet-computer">Internet Computer</option>
                        <option value="ftx-token">FTX Token</option>
                        <option value="staked-ether">Lido Staked Ether</option>
                        <option value="hedera-hashgraph">Hedera</option>
                        <option value="vechain">VeChain</option>
                        <option value="axie-infinity">Axie Infinity</option>
                        <option value="magic-internet-money">Magic Internet Money</option>
                        <option value="the-sandbox">The Sandbox</option>
                        <option value="compound-ether">cETH</option>
                        <option value="filecoin">Filecoin</option>
                        <option value="ethereum-classic">Ethereum Classic</option>
                        <option value="harmony">Harmony</option>
                        <option value="elrond-erd-2">Elrond</option>
                        <option value="theta-token">Theta Network</option>
                        <option value="monero">Monero</option>
                        <option value="decentraland">Decentraland</option>
                        <option value="tezos">Tezos</option>
                        <option value="klay-token">Klaytn</option>
                        <option value="leo-token">LEO Token</option>
                        <option value="helium">Helium</option>
                        <option value="cdai">cDAI</option>
                        <option value="iota">IOTA</option>
                        <option value="the-graph">The Graph</option>
                        <option value="compound-usd-coin">cUSDC</option>
                        <option value="aave">Aave</option>
                        <option value="pancakeswap-token">PancakeSwap</option>
                        <option value="eos">EOS</option>
                        <option value="kusama">Kusama</option>
                        <option value="arweave">Arweave</option>
                        <option value="osmosis">Osmosis</option>
                        <option value="flow">Flow</option>
                        <option value="gala">Gala</option>
                        <option value="bittorrent-2">BitTorrent</option>
                        <option value="radix">Radix</option>
                        <option value="enjincoin">Enjin Coin</option>
                        <option value="quant-network">Quant</option>
                        <option value="blockstack">Stacks</option>
                        <option value="bitcoin-cash-sv">Bitcoin SV</option>
                        <option value="convex-finance">Convex Finance</option>
                        <option value="frax">Frax</option>
                        <option value="amp-token">Amp</option>
                        <option value="maker">Maker</option>
                        <option value="celo">Celo</option>
                        <option value="wonderland">Wonderland</option>
                        <option value="theta-fuel">Theta Fuel</option>
                        <option value="thorchain">THORChain</option>
                        <option value="curve-dao-token">Curve DAO Token</option>
                        <option value="loopring">Loopring</option>
                        <option value="ecash">eCash</option>
                        <option value="olympus">Olympus</option>
                        <option value="oasis-network">Oasis Network</option>
                        <option value="neo">NEO</option>
                        <option value="huobi-btc">Huobi BTC</option>
                        <option value="zcash">Zcash</option>
                        <option value="ecomi">ECOMI</option>
                        <option value="kadena">Kadena</option>
                        <option value="basic-attention-token">Basic Attention Token</option>
                        <option value="kucoin-shares">KuCoin Token</option>
                        <option value="huobi-token">Huobi Token</option>
                        <option value="dash">Dash</option>
                        <option value="celsius-degree-token">Celsius Network</option>
                        <option value="true-usd">TrueUSD</option>
                        <option value="chiliz">Chiliz</option>
                        <option value="waves">Waves</option>
                        <option value="frax-share">Frax Share</option>
                        <option value="sushi">Sushi</option>
                        <option value="nexo">NEXO</option>
                        <option value="secret">Secret</option>
                        <option value="defi-kingdoms">DeFi Kingdoms</option>
                        <option value="safemoon">SafeMoon [OLD]</option>
                    </select>

           

                    <br/><br/>

                    <br/><br/>
                    <button type="button" className="add-input"
                        onClick={Valider}>
                        Valider</button>
                </form>

            </div>
        </div>
    )
}

export default Addcoin
