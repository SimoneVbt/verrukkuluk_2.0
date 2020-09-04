import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { HeaderFooter, white } from '../resources/styles/styles.js';

const txtStyle = {
    color: white,
    fontSize: 10
}

const iconStyle = {
    color: white,
    fontSize: 35
}

const buttonStyle = {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
}

export default class Foot extends Component
{
    constructor(props) {
        super(props);
    }

    _startSearch() {
        //this.props.titleChange("zoeken");
        Actions.search();
    }

    render() {

        return(
            <Footer style={ HeaderFooter }>
                <FooterTab  style={ HeaderFooter }>
                    <Button vertical onPress={ () => this._startSearch() } style={ buttonStyle }>
                        <Icon name="md-search" type="Ionicons" style={ iconStyle } />
                        <Text style={ txtStyle }>zoeken</Text>
                    </Button>
                    <Button vertical onPress={ () => Actions.mydishes() } style={ buttonStyle }>
                        <Icon name="md-book" type="Ionicons" style={ iconStyle } />
                        <Text style={ txtStyle }>gerechten</Text>
                    </Button>
                    <Button vertical onPress={ () => Actions.favorites() } style={ buttonStyle }>
                        <Icon name="star" type="FontAwesome" style={ iconStyle } />
                        <Text style={ txtStyle }>favorieten</Text>
                    </Button>
                    <Button vertical onPress={ () => Actions.shoppingcart() } style={ buttonStyle }>
                        <Icon name="shopping-cart" type="FontAwesome" style={ iconStyle } />
                        <Text style={ txtStyle }>lijstje</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }
}