import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Header, Left, Right, Body, Title, Icon, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as Style from '../resources/styles/styles.js';

const iconStyle = {
    color: Style.white,
    fontSize: 30
}

export default class Head extends Component
{
    _renderPopButton() {
        if (this.props.home) {
            return(
                <Button onPress={ () => Actions.Profile() } transparent>
                    <Icon name="person" type="Ionicons" style={ iconStyle } />
                </Button>
            )
        } else if (!this.props.login) {
            return(
                <Button onPress={ () => Actions.pop() } transparent>
                    <Icon name="chevron-back" type="Ionicons" style={ iconStyle } />
                </Button>
            )
        }
    }

    _renderSearchButton() {
        if (!this.props.noSearch) {
            return (
                <Button onPress={ () => Actions.Search() } transparent>
                    <Icon name="md-search" type="Ionicons" style={ iconStyle } />
                </Button>                    
            )
        }
    }

    render() {
        return(
            <Header style={ Style.HeaderFooter } hasTabs={ this.props.hasTabs ? true : false } >
                <StatusBar backgroundColor={ Style.gold } barStyle="light-content" />
                <Left style={{ flex: 1 }}>
                    { this._renderPopButton() }
                </Left>
                <Body style={{ flex: 2 }}>
                    <Title style={{ fontStyle: "italic", color: Style.white }}>
                        <Icon name="chef-hat" type="MaterialCommunityIcons" style={{ color: Style.white }} />
                        { (this.props.title).toLowerCase() }
                    </Title>
                </Body>
                <Right style={{ flex: 1 }}>
                    { this._renderSearchButton() }
                </Right>
            </Header>
        )
    }

}