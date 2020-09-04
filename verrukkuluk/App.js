import React, { Component } from 'react';
import { Container } from 'native-base';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { darkRed } from './app/resources/styles/styles';

import Head from './app/components/Head';
import Foot from './app/components/Foot';

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
        title: "verrukkuluk!nl",
        login: false
    };
    this.titleChange = this.titleChange.bind(this);
    this.loginChange = this.loginChange.bind(this);
  }

  titleChange = (newTitle) => {
    this.setState({
      title: newTitle
    })
  }

  loginChange = () => {
    this.setState( prevState => ({
      login: !prevState.login
    }))
  }

  render() {
    return(
      <Container>
        <Head title={ this.state.title } login={ this.state.login }
              titleChange={ this.titleChange } loginChange={ this.loginChange } />
        <Router headerMode="none" sceneStyle={{ backgroundColor: darkRed }}>
          <Stack key="root">
            <Scene key="home" component={ Home } />
            <Scene key="detail" component={ Detail } initial />
            <Scene key="login" component={ Login } />
            <Scene key="shoppingcart" component={ ShoppingCart } />
            <Scene key="favorites" component={ Favorites } />
            <Scene key="mydishes" component={ MyDishes } />
            <Scene key="search" component={ Search } />
          </Stack>
        </Router>
        <Foot titleChange={ this.titleChange } />
      </Container>
    )
  }
}