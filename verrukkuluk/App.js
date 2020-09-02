import React, { Component, Fragment } from 'react';
//import { StatusBar } from 'react-native';
import { Container } from 'native-base';
import { Router, Stack, Scene } from 'react-native-router-flux';
//import { gold } from './app/resources/styles/styles';

import Head from './app/components/Head';
import Foot from './app/components/Foot';
import Home from './app/components/Home';
import Login from './app/components/Login';
import ShoppingCart from './app/components/ShoppingCart';
import Favorites from './app/components/Favorites';
import MyDishes from './app/components/MyDishes';
import Search from './app/components/Search';

const sceneStyle = {
    backgroundColor: "rgb(178, 51, 8)"
  }


export default class App extends Component
{
  render() {
    return(
      <Container>
        <Head />
        <Router headerMode="none" sceneStyle={ sceneStyle }>
          <Stack key="root">
            <Scene key="home" component={ Home } initial />
            <Scene key="login" component={ Login } />
            <Scene key="shoppingcart" component={ ShoppingCart } />
            <Scene key="favorites" component={ Favorites } />
            <Scene key="mydishes" component={ MyDishes } />
            <Scene key="search" component={ Search } />
          </Stack>
        </Router>
        <Foot />
      </Container>
    )
  }
}