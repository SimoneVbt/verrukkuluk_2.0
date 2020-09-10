import React, { Component } from 'react';
import { Card, CardItem, Text, Icon, Thumbnail, View } from 'native-base';
import { darkRed, beige, cardStyle, tabCardStyle, titleStyle, starStyle } from '../resources/styles/styles.js';

export default class DishPreparation extends Component
{
    render() {
        return(
            <Card style={ tabCardStyle }>
                <CardItem style={ cardStyle }>
                    <Text style={ titleStyle }>Bereiding</Text>
                </CardItem>
            </Card>
        );
    }
}