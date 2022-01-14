import React, {useState, useEffect} from 'react'
import {Table, Container, Row, Image} from 'react-bootstrap';

import './Home.css';

import axios from 'axios';
import Coin from '../../component/Coins/Coin';
import NavbarComponent from '../../component/Navbar/NavbarComponent';


const Home = () => {
    const [coins, setCoins] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {

        axios.get('http://localhost:5000/topcoins').then(res => {
            setCoins(res.data);
            console.log(res.data);
        }).catch(error => console.error(error));
    }, []);

    const handleChange = e => {
        setSearch(e.target.value)
    }

    const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
            <NavbarComponent/>
            <div className="coin-app">
                <div className="coin-search">
                    <h1 className="coin-text">Search a currency</h1>
                    <form>
                        <input type="text" placeholder="Search" className="coin-input"
                            onChange={handleChange}/>
                    </form>
                </div>
                {/* <select name="ete" id="">
                {filteredCoins.map(coin => 
                    <option value={coin.id} data-content="<i class='fa fa-address-book-o' aria-hidden='true'></i>Option1">{coin.name}</option>
                )}
                </select> */}
               
                <Container>
                    <Row>
                        <Table striped bordered hover variant="dark">
                            <thead> { <tr >     
      <th></th>
      <th>Name</th>
      <th>Symbol</th>
      <th>Price</th>
      <th>Total Volume</th>
      <th>Price Change % 24h</th>
      <th>Market Cap</th>
    </tr> } </thead>
                            <tbody> {
                                filteredCoins.map(coin => {
                                    return <Coin key={
                                            coin.id
                                        }
                                        name={
                                            coin.name
                                        }
                                        image={
                                            coin.image
                                        }
                                        symbol={
                                            coin.symbol
                                        }
                                        marketcap={
                                            coin.market_cap
                                        }
                                        price={
                                            coin.current_price
                                        }
                                        priceChange={
                                            coin.price_change_percentage_24h
                                        }
                                        volume={
                                            coin.total_volume
                                        }/>;
                                })
                            } </tbody>
                        </Table>
                    </Row>
                </Container>

            </div>
        </>
    )
}

export default Home
