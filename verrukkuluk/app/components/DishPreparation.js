import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Card, CardItem, Text, ListItem } from 'native-base';
import * as Style from '../resources/styles/styles.js';


export default class DishPreparation extends Component
{
    _renderPrepStep(step, index) {
        let prepStep = step.tekstveld.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'");

        return(
            <ListItem style={{ flexDirection: "column", marginLeft: 5 }}>
                <Text style={{ color: Style.darkRed, fontWeight: "bold", fontSize: 18 }}>
                    - { index + 1 } -
                </Text>
                <Text style={{ textAlign: "center" }}>
                    { prepStep }
                </Text>
            </ListItem>
        )
    }

    render() {
        return(
            <Card style={ Style.tabCardStyle }>
                <CardItem style={ Style.cardItemStyle }>
                    <Text style={ Style.titleStyle }>Bereiding</Text>
                </CardItem>
                <CardItem style={ Style.cardItemStyle }>
                    <FlatList
                        data={ this.props.preparation }
                        keyExtractor={ prep => prep.id.toString() }
                        renderItem={ ({item, index}) => this._renderPrepStep(item, index) }
                        style={{ marginBottom: 20 }}
                        />
                </CardItem>   
            </Card>
        );
    }
}