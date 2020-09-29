import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Header, Left, Right, Body, Title, Icon, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as style from '../resources/styles/styles.js';

const iconStyle = {
    color: style.white,
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
            <Header style={ style.HeaderFooter } hasTabs={ this.props.hasTabs ? true : false } >
                <StatusBar backgroundColor={ style.gold } barStyle="light-content" />
                <Left style={{ flex: 1 }}>
                    { this._renderPopButton() }
                </Left>
                <Body style={{ flex: 2 }}>
                    <Title style={{ fontStyle: "italic", color: style.white }}>
                        <Icon name="chef-hat" type="MaterialCommunityIcons" style={{ color: style.white }} />
                        { this.props.title.toLowerCase() }
                    </Title>
                </Body>
                <Right style={{ flex: 1 }}>
                    { this._renderSearchButton() }
                </Right>
            </Header>
        )
    }

}