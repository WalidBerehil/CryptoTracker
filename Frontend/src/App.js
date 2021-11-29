import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Coin from './component/Coins/Coin';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from './pages/Home/Home';
import NavbarComponent from './component/Navbar/NavbarComponent';
import Login from './pages/Login/Login';

function App() {


    return (
        <Router>
        <Switch>
          <Route path="/home">
             <Home />
          </Route>
          <Route path="/login">
             <Login />
          </Route>
  
         <Route path="/">
             <Home/>
          </Route>
          
          {/*  add exact before path="/" so you can make exception of other route
          <Route path="*">
            <h1>tttttttt</h1>
          </Route> */}
        </Switch>
      </Router>
    );
}

export default App;
