import React, { Component } from 'react';
import { StatusBar, Alert } from 'react-native';
import { Header, Left, Right, Body, Title, Icon, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { HeaderFooter, white, gold } from '../resources/styles/styles.js';

const iconStyle = {
    color: white,
    fontSize: 35
}
const bodyStyle = {
    flex: 2
}


export default class Head extends Component
{
    _handleLogout() {
        Alert.alert(
            'Uitloggen',
            'Weet je zeker dat je wil uitloggen?',
            [
                {
                    text: 'ja',
                    onPress: () => this.props.loginChange()
                },
                {
                    text: 'nee',
                    style: 'cancel'
                }
            ]
        )
    }

    _renderLoginButton() {
        if (this.props.login) {
            return(
                <Button onPress={ () => this._handleLogout() } transparent>
                    <Icon name="sign-out" type="FontAwesome" style={ iconStyle } />
                </Button>
            )
        }
            return(
                <Button onPress={ () => Actions.Login() } transparent>
                    <Icon name="sign-in" type="FontAwesome" style={ iconStyle } />
                </Button>
            )
    }


    render() {

        return(
            <Header style={ HeaderFooter } hasTabs={ this.props.hasTabs ? true : false } >
                <StatusBar backgroundColor={ gold } barStyle="light-content" />
                <Left style={{ flex: 1 }}>
                    { this._renderLoginButton() }
                </Left>
                <Body style={ bodyStyle }>
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