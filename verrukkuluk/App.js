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
  constructor(props) {
    super(props);
    this.state = {
        login: false
    };
    this.loginChange = this.loginChange.bind(this);
  }

  loginChange = () => {
    this.setState( prevState => ({
      login: !prevState.login
    }))
  }

  render() {
    return(
      <Router headerMode="none">
        <Stack key="root">
          <Scene key="Home" component={ Home } login={ this.state.login } loginChange={ this.loginChange } type="replace" initial />
          <Scene key="Detail" component={ Detail } login={ this.state.login } loginChange={ this.loginChange } />
          <Scene key="Login" component={ Login } login={ this.state.login } loginChange={ this.loginChange } type="replace" />
          <Scene key="ShoppingCart" component={ ShoppingCart } login={ this.state.login } loginChange={ this.loginChange } type="replace" />
          <Scene key="Favorites" component={ Favorites } login={ this.state.login } loginChange={ this.loginChange } type="replace" />
          <Scene key="MyDishes" component={ MyDishes } login={ this.state.login } loginChange={ this.loginChange } type="replace" />
          <Scene key="Search" component={ Search } login={ this.state.login } loginChange={ this.loginChange } type="replace" />
        </Stack>
      </Router>
    )
  }
}