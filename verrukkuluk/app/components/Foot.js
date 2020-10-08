import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as style from '../resources/styles/styles.js';

const txtStyle = {
    color: style.white,
    fontSize: 10
}
const iconStyle = {
    color: style.white,
    fontSize: 35
}
const logoButtonStyle = {
    backgroundColor: "#000",
    height: "100%",
    borderRadius: 0
}

export default class Foot extends Component
{
    render() {

        return(
            <Footer style={ style.HeaderFooter }>
                <FooterTab  style={ style.HeaderFooter }>
                    <Button vertical onPress={ () => Actions.Home() } style={ logoButtonStyle } >
                        <Icon name="chef-hat" type="MaterialCommunityIcons" style={ iconStyle } />
                        <Text style={ txtStyle }>home</Text>
                    </Button>
                    <Button vertical onPress={ () => Actions.MyDishes() } >
                        <Icon name="md-book" type="Ionicons" style={ iconStyle } />
                        <Text style={ txtStyle }>gerechten</Text>
                    </Button>
                    <Button vertical onPress={ () => Actions.Favorites() } >
                        <Icon name="star" type="FontAwesome" style={ iconStyle } />
                        <Text style={ txtStyle }>favorieten</Text>
                    </Button>
                    <Button vertical onPress={ () => Actions.ShoppingList() } >
                        <Icon name="shopping-cart" type="FontAwesome" style={ iconStyle } />
                        <Text style={ txtStyle }>lijstje</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }
}