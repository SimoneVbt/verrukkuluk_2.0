import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Card, CardItem, Text, ListItem } from 'native-base';
import * as Style from '../resources/styles/styles.js';


export default class DishPreparation extends Component
{
    renderPrepStep(step, index) {
        return(
            <ListItem style={{ flexDirection: "column", marginLeft: 5 }}>
                <Text style={{ color: Style.darkRed, fontWeight: "bold", fontSize: 18 }}>
                    - { index + 1 } -
                </Text>
                <Text style={{ textAlign: "center" }}>
                    { step.tekstveld }
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
                        renderItem={ ({item, index}) => this.renderPrepStep(item, index) }
                        style={{ marginBottom: 20 }}
                        />
                </CardItem>   
            </Card>
        );
    }
}