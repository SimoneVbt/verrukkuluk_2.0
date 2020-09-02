import React, { Component } from 'react';
import { Header, Left, Right, Icon, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { HeaderFooter } from '../resources/styles/styles.js';

const logoStyle = {
    color: "#FFF",
    fontSize: 73,
    backgroundColor: "#000",
    padding: 5
}
const iconStyle = {
    color: "#FFF",
    fontSize: 40
}

export default class Head extends Component
{
    render() {

        return(
            <Header style={ HeaderFooter }>
                <Left>
                    <Button onPress={ () => Actions.home() } transparent>
                        <Icon name="chef-hat" type="MaterialCommunityIcons" style={ logoStyle } />
                    </Button>
                </Left>
                <Right>
                    <Button onPress={ () => Actions.login() } transparent>
                        <Icon name="sign-in" type="FontAwesome" style={ iconStyle } />
                    </Button>
                    {/*
                    <Button onPress={ () => Actions.logout() } transparent>
                        <Icon name="sign-out" type="FontAwesome style={ iconStyle } />
                    </Button>
                    */}
                    <Button onPress={ () => Actions.shoppingcart() } transparent>
                        <Icon name="shopping-cart" type="Feather" style={ iconStyle } />
                    </Button>
                </Right>
            </Header>
        )
    }

}