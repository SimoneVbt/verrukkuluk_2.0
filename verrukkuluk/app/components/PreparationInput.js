import React, { Component } from 'react';
import { Alert } from 'react-native';
import { View, CardItem, Item, Input, Label, Thumbnail, Textarea } from 'native-base';
import * as style from '../resources/styles/styles';
import { Picker } from '@react-native-community/picker';


export default class PreparationInput extends Component
{
    state = {
        text: ""
    }

    componentDidMount() {
        if (this.props.step) {
            const step = this.props.step;
            this.setState({ text: step.tekstveld });
        }
    }


    handleChange(text) {
        this.setState({ text: text });
    }


    render() {
        return(
            <CardItem style={ style.cardItemStyle }>
                <Item stackedLabel style={{ width: "100%" }}>
                    <Label style={ style.labelStyle }>Stap { this.props.number }</Label>
                    <Textarea value={ this.state.text }
                            onChangeText={ (text) => this.handleChange(text) }
                            style={{ width: "100%" }} />
                </Item>
            </CardItem>

        )
    }
}