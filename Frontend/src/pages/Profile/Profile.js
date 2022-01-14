import React, {useState, useEffect} from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


import './Profile.css';


import NavbarComponent from '../../component/Navbar/NavbarComponent';
import Coinsprofile from '../../component/Coinsprofile/Coinsprofile';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// export default class Profile extends Component {
//     componentDidMount() {
//         let x = localStorage.getItem('user-token');
//         x = x.substr(1,x.length-2)

//         const config = {
//             headers: {
//                 Authorization: 'Bearer ' + x
//             }
//         }



//         axios.get('http://localhost:5000/mypost', config).then(
//             res => {
//                console.log(res.data[0].name);
//                let y = res.data;
//                this.setState({
//                    reponse: y
//                });
               
//             },
//             err => {
//                 console.log(err);
//             }
//         )
//     }

//     render(){
//         if(this.state.reponse){
//             return (
               
//                 <h2 className="user"> {this.state.reponse}   </h2>
//             )}
//             else{
//                 return (
                   
//                     <h2 className="user"> test  </h2>
//                 )}
       
       
            
        
//     return (
//         <div>
//             <Navbar collapseOnSelect expand="lg" variant="dark">
//             <Container>
//             <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
//                 <Navbar.Collapse id="responsive-navbar-nav">
//                     <Nav className="me-auto">
//                         <Nav.Link href="#features">Features</Nav.Link>
//                         <Nav.Link href="#pricing">Pricing</Nav.Link>
//                         <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
//                             <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//                             <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
//                             <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//                             <NavDropdown.Divider/>
//                             <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
//                         </NavDropdown>
//                     </Nav>
//                     <Nav>
//                         <Nav.Link href="logout">Logout</Nav.Link>
                        
//                     </Nav>
//                     </Navbar.Collapse>
                
//             </Container>
//         </Navbar>
        
//                 <div className="searsh" >
                    
//                     <h1 className="search">Search</h1>
//                     <form>
//                         <input type="text" placeholder="Search"  className="input"/>
//                     </form>
//                     </div>
               
                    
//                     </div>
                        
                


        




//     )
//     }
// }


const Profile = () => {
    let history = useHistory();

    
    
    const add = () => {
        history.push('/add')
      }
    const [coins1, setCoins1] = useState([])
    const [search1, setSearch1] = useState('')

    useEffect(() => {
        if(!localStorage.getItem('user-token'))
        {
            history.push("/login");  
        }
        else{
            let x = localStorage.getItem('user-token');
            x = x.substr(1,x.length-2)
    
            const config = {
                headers: {
                    Authorization: 'Bearer ' + x
                }
            }
    
            axios.get('http://localhost:5000/mypost', config).then(res => {
                setCoins1(res.data);
                console.log(res.data);
            }).catch(error => console.error(error));
        }


    }, [history]);

    const handleChange = e => {
        setSearch1(e.target.value)
    }

if(coins1!=="No Post"){
    const filteredCoins = coins1.filter(coin => coin.name.toLowerCase().includes(search1.toLowerCase()))

  
    
    
    

    return (
        <>
            <NavbarComponent/>


            <div className="coin-app">
                <div className="coin-search">
                    <h1 className="coin-text">Search a currency</h1>
                    <form>
                        <input type="text" placeholder="Search" className="coin-input"
                            onChange={handleChange}/>
                    </form><br/>
                <button type="button" className="add-input" onClick={add}> Ajouter </button> 
                    
                </div>

                
                <div className="container mt-5 mb-5">
                <div className="row g-2">
                 {
                                filteredCoins.map(coin => {
                                    return <Coinsprofile key={
                                            coin.id
                                        }
                                        idPost={
                                            coin.idPost
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
                                        userquantity={
                                            coin.useramount
                                        }
                                        price={
                                            coin.current_price
                                        }
                                        priceChange={
                                            coin.price_change_percentage_24h
                                        }
                                        totalprice={
                                            coin.current_price*coin.useramount
                                        }/>;
                                })
                            } 

</div>
</div>

            </div>
        </>
    )
}
else
{
    return (
        <>
            <NavbarComponent/>
            <div className="coin-app">
                <div className="coin-search">
                    <h1 className="coin-text">Search a currency</h1>
                    <form>
                        <input type="text" placeholder="Search" className="coin-input"
                            onChange={handleChange}/>
                    </form><br/>
                <button type="button" className="add-input" onClick={add}> Ajouter </button> 
                    
                </div>
                
                <div className="container mt-5 mb-5">
                <div className="row g-2">
         No coins found please Add new Coin

</div>
</div>

            </div>
        </>
    )
}
   
}

export default Profile
