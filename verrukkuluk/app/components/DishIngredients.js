import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Card, CardItem, Text, ListItem, CheckBox } from 'native-base';
import { darkRed, cardItemStyle, tabCardStyle, titleStyle } from '../resources/styles/styles.js';


class Ingredient extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }

    _handleCheck() {
        this.setState( prevState => ({
            checked: !prevState.checked
        }))
    }

    render() {
        return( 
            <ListItem onPress={ () => this._handleCheck() }>
                <CheckBox  color={ darkRed } style={{ marginLeft: -20 }} checked={ this.state.checked }  />
                <Text>  { this.props.string }</Text>
            </ListItem> 
        )
    }
}


export default class DishIngredients extends Component
{

    _renderIngredient(ingr) {
        let ingrString = ingr.aantal + ingr.eenheid + " " + ingr.naam;

        if (ingr.eenheid == "teen") {
            ingrString = ingr.aantal + " " + ingr.eenheid + " " + ingr.naam;
        } else if (ingr.eenheid == "stuks") {
            ingrString = ingr.aantal + " " + ingr.naam;
        }

        let string = ingrString.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'");

        return(
            <Ingredient string={ string } />
        )

    }
    
    render() {
        return(
            <Card style={ tabCardStyle }>
                <CardItem style={ cardItemStyle }>
                    <Text style={ titleStyle }>Ingrediënten</Text>
                </CardItem>
                <CardItem style={ cardItemStyle }>
                    <FlatList
                        data={ this.props.ingredients }
                        keyExtractor={ ingr => ingr.id.toString() }
                        renderItem={ ({item}) => this._renderIngredient(item) }
                        style={{ marginBottom: 20 }}
                        />
                </CardItem>   
            </Card>
        );
    }
}