import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Header, Left, Right, Body, Title, Icon, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { HeaderFooter, white, gold } from '../resources/styles/styles.js';

const iconStyle = {
    color: white,
    fontSize: 30
}

export default class Head extends Component
{
    _renderHomeButton() {
        if (this.props.home) {
            return(
                <Button onPress={ () => Actions.Login() } transparent>
                    <Icon name="person" type="Ionicons" style={ iconStyle } />
                </Button>
            )
        }
        return(
            <Button onPress={ () => Actions.pop() } transparent>
                <Icon name="chevron-back" type="Ionicons" style={ iconStyle } />
            </Button>
        )
    }


    render() {
        return(
            <Header style={ HeaderFooter } hasTabs={ this.props.hasTabs ? true : false } >
                <StatusBar backgroundColor={ gold } barStyle="light-content" />
                <Left style={{ flex: 1 }}>
                    { this._renderHomeButton() }
                </Left>
                <Body style={{ flex: 2 }}>
                    <Title style={{ fontStyle: "italic", color: white }}>
                        <Icon name="chef-hat" type="MaterialCommunityIcons" style={{ color: white }} />
                        { (this.props.title).toLowerCase() }
                    </Title>
                </Body>
                <Right style={{ flex: 1 }}>
                    <Button onPress={ () => Actions.Search() } transparent>
                        <Icon name="md-search" type="Ionicons" style={ iconStyle } />
                    </Button>
                </Right>
            </Header>
        )
    }

}