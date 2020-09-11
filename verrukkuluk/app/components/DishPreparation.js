import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Card, CardItem, Text, ListItem } from 'native-base';
import { darkRed, cardStyle, tabCardStyle, titleStyle } from '../resources/styles/styles.js';

let counter = 0;

export default class DishPreparation extends Component
{
    componentWillUnmount() {
        counter = 0;
    }
    
    _renderPrepStep(step) {
        counter++;
        let prepStep = step.tekstveld.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'");

        return(
            <ListItem style={{ flexDirection: "column", marginLeft: 5 }}>
                <Text style={{ color: darkRed, fontWeight: "bold", fontSize: 18 }}>
                    - { counter } -
                </Text>
                <Text style={{ textAlign: "center" }}>
                    { prepStep }
                </Text>
            </ListItem>
        )
    }

    render() {
        return(
            <Card style={ tabCardStyle }>
                <CardItem style={ cardStyle }>
                    <Text style={ titleStyle }>Bereiding</Text>
                </CardItem>
                <CardItem style={ cardStyle }>
                    <FlatList
                        data={ this.props.preparation }
                        keyExtractor={ prep => prep.id.toString() }
                        renderItem={ ({item}) => this._renderPrepStep(item) }
                        style={{ marginBottom: 20 }}
                        />
                </CardItem>   
            </Card>
        );
    }
}