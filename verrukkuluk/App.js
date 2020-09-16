import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import API from './app/api/API';

import Home from './app/views/Home';
import Detail from './app/views/Detail';
import Login from './app/views/Login';
import ShoppingCart from './app/views/ShoppingCart';
import Favorites from './app/views/Favorites';
import MyDishes from './app/views/MyDishes';
import Search from './app/views/Search';
import Profile from './app/views/Profile';


export default class App extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      userPresence: false,
    }
  }

  componentDidMount() {
    let user = API.fetchFromDatabase("gebruiker");
    if (user) {
      this.setState({
        userPresence: true
      })
    }
  }    

  render() {
    return(
      <Router headerMode="none">
        <Stack key="root">
          <Scene key="Login" component={ Login } type="replace" initial={ !this.state.userPresence } />
          <Scene key="Home" component={ Home } type="replace" initial={ this.state.userPresence } />
          <Scene key="Detail" component={ Detail } />
          <Scene key="ShoppingCart" component={ ShoppingCart } />
          <Scene key="Favorites" component={ Favorites } />
          <Scene key="MyDishes" component={ MyDishes } />
          <Scene key="Search" component={ Search } />
          <Scene key="Profile" component={ Profile } />
        </Stack>
      </Router>
    )
  }
}