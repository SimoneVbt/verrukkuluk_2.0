import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Card, CardItem, Text, ListItem } from 'native-base';
import * as style from '../resources/styles/styles.js';


export default class DishPreparation extends Component
{
    renderPrepStep(step, index) {
        return(
            <ListItem style={{ flexDirection: "column", marginLeft: 5 }}>
                <Text style={{ color: style.darkRed, fontWeight: "bold", fontSize: 18 }}>
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
            <Card style={ style.tabCardStyle }>
                <CardItem style={ style.cardItemStyle }>
                    <Text style={ style.titleStyle }>Bereiding</Text>
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
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