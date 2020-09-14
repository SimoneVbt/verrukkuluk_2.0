import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Home from './app/views/Home';
import Detail from './app/views/Detail';
import Login from './app/views/Login';
import ShoppingCart from './app/views/ShoppingCart';
import Favorites from './app/views/Favorites';
import MyDishes from './app/views/MyDishes';
import Search from './app/views/Search';

export default class App extends Component
{
  render() {
    return(
      <Router headerMode="none">
        <Stack key="root">
          <Scene key="Home" component={ Home } type="replace" initial />
          <Scene key="Detail" component={ Detail } />
          <Scene key="Login" component={ Login } />
          <Scene key="ShoppingCart" component={ ShoppingCart } />
          <Scene key="Favorites" component={ Favorites } />
          <Scene key="MyDishes" component={ MyDishes } />
          <Scene key="Search" component={ Search } />
        </Stack>
      </Router>
    )
  }
}