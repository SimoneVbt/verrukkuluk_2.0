import React, { Component } from 'react';
import { StatusBar, View, Alert } from 'react-native';
import { Header, Left, Right, Body, Title, Icon, Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { HeaderFooter, white, gold } from '../resources/styles/styles.js';

const logoStyle = {
    color: white,
    fontSize: 70,
    backgroundColor: "#000",
    padding: 8,
    marginLeft: -20
}
const iconStyle = {
    color: white,
    fontSize: 40,
    marginLeft: 14
}
const txtStyle = {
    color: white,
    fontSize: 10
}
const logButton = {
    flexDirection: "column",
    marginBottom: 10
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
                <Button onPress={ () => this._handleLogout() } transparent style={ logButton }>
                    <Icon name="sign-out" type="FontAwesome" style={ iconStyle } />
                    <Text style={ txtStyle }>uitloggen</Text>
                </Button>
            )
        }
            return(
                <Button onPress={ () => Actions.Login() } transparent style={ logButton }>
                    <View>
                        <Icon name="sign-in" type="FontAwesome" style={ iconStyle } />
                    </View>
                    <Text style={ txtStyle }>inloggen</Text>
                </Button>
            )
    }


    render() {

        return(
            <Header style={ HeaderFooter }>
                <StatusBar backgroundColor={ gold } barStyle="light-content" />
                <Left style={{ flex: 2 }}>
                    <Button onPress={ () => Actions.Home() } transparent>
                        <Icon name="chef-hat" type="MaterialCommunityIcons" style={ logoStyle } />
                    </Button>
                </Left>
                <Body style={{ flex: 3 }}>
                    <Title style={{ fontStyle: "italic" }}>{ this.props.title }</Title>
                </Body>
                <Right style={{ flex: 2 }}>
                    { this._renderLoginButton() }
                </Right>
            </Header>
        )
    }

}