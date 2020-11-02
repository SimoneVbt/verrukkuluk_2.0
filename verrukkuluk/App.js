import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import API from './app/api/API';
import Home from './app/views/Home';
import Detail from './app/views/Detail';
import Login from './app/views/Login';
import ShoppingList from './app/views/ShoppingList';
import Favorites from './app/views/Favorites';
import MyDishes from './app/views/MyDishes';
import Search from './app/views/Search';
import Profile from './app/views/Profile';
import EditProfile from './app/views/EditProfile';
import Register from './app/views/Register';
import NewDish from './app/views/NewDish';
import Camera from './app/views/Camera';
import Ingredients from './app/views/Ingredients';
import Preparation from './app/views/Preparation';


export default class App extends Component
{
  state = {
    userPresence: false
  }

  componentDidMount() {
    let user = API.fetchUser();
    if (user) { this.setState({ userPresence: true }) }
  }

  render() {
    return(
      <Router headerMode="none">
        <Stack key="root">
          <Scene key="Login" component={ Login } type="replace" initial={ !this.state.userPresence } />
          <Scene key="Register" component={ Register } />

          <Scene key="Home" component={ Home } type="replace" initial={ this.state.userPresence } />
          <Scene key="Detail" component={ Detail } />
          <Scene key="Search" component={ Search } />

          <Scene key="ShoppingList" component={ ShoppingList } />
          <Scene key="Favorites" component={ Favorites } />

          <Scene key="MyDishes" component={ MyDishes } />
          <Scene key="NewDish" component={ NewDish } />
          <Scene key="Camera" component={ Camera } />
          <Scene key="Ingredients" component={ Ingredients } />
          <Scene key="Preparation" component={ Preparation } />

          <Scene key="Profile" component={ Profile } />
          <Scene key="EditProfile" component={ EditProfile }/>
        </Stack>
      </Router>
    )
  }
}