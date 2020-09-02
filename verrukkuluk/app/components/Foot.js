import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { HeaderFooter } from '../resources/styles/styles.js';

const txtStyle = {
    color: "#FFF"
}

const iconStyle = {
    color: "#FFF",
    fontSize: 35
}

export default class Foot extends Component
{
    render() {

        return(
            <Footer style={ HeaderFooter }>
                <FooterTab  style={ HeaderFooter }>
                    <Button vertical onPress={ () => Actions.mydishes() }>
                        <Icon name="md-book" type="Ionicons" style={ iconStyle } />
                        <Text style={ txtStyle }>Mijn gerechten</Text>
                    </Button>
                    <Button vertical onPress={ () => Actions.favorites() }>
                        <Icon name="star" type="FontAwesome" style={ iconStyle } />
                        <Text style={ txtStyle }>favorieten</Text>
                    </Button>
                    <Button vertical onPress={ () => Actions.search() }>
                        <Icon name="md-search" type="Ionicons" style={ iconStyle } />
                        <Text style={ txtStyle }>Zoeken</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }
}