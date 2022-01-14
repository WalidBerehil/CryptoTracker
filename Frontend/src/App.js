import './App.css';
import React from 'react';

import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Addcoin from './pages/Addcoin/Addcoin';


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
          <Route path="/register">
             <Register />
          </Route>
          <Route path="/profile">
             <Profile />
          </Route>
          <Route path="/add">
             <Addcoin />
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
