import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Card, CardItem, Text, ListItem, CheckBox } from 'native-base';
import { darkRed, cardStyle, tabCardStyle, titleStyle } from '../resources/styles/styles.js';

export default class DishIngredients extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }

    _renderIngredient(ingr) {
        let ingrString = ingr.aantal + ingr.eenheid + " " + ingr.naam;

        if (ingr.eenheid == "stuks" || ingr.eenheid == "teen") {
            ingrString = ingr.aantal + " " + ingr.eenheid + " " + ingr.naam;
        }

        return(
            <ListItem>
                <CheckBox checked={ this.state.checked } color={ darkRed } style={{ marginLeft: -20 }} />
                <Text>  { ingrString }</Text>
            </ListItem>
        )

    }
    
    render() {
        return(
            <Card style={ tabCardStyle }>
                <CardItem style={ cardStyle }>
                    <Text style={ titleStyle }>Ingrediënten</Text>
                </CardItem>
                <CardItem style={ tabCardStyle }>
                    {/* error: virtualizedlists should never be nested inside plain scrollviews with the same orientation */}
                    <FlatList
                        data={ this.props.ingredients }
                        keyExtractor={ ingr => ingr.id.toString() }
                        renderItem={ ({item}) => this._renderIngredient(item) }
                        />
                </CardItem>
                
                        
            </Card>
        );
    }
}