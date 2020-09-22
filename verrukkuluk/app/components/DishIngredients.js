import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Card, CardItem, Text, ListItem, CheckBox } from 'native-base';
import * as Style from '../resources/styles/styles.js';


class Ingredient extends Component
{
    state = {
        checked: false
    }

    handleCheck() {
        this.setState( prevState => ({
            checked: !prevState.checked
        }))
    }

    render() {
        return( 
            <ListItem onPress={ () => this.handleCheck() }>
                <CheckBox  color={ Style.darkRed } style={{ marginLeft: -20 }} checked={ this.state.checked }  />
                <Text>  { this.props.string }</Text>
            </ListItem> 
        )
    }
}


export default class DishIngredients extends Component
{

    renderIngredient(ingr) {
        let ingrString = ingr.aantal + ingr.eenheid + " " + ingr.naam;

        if (ingr.eenheid == "teen") {
            ingrString = ingr.aantal + " " + ingr.eenheid + " " + ingr.naam;
        } else if (ingr.eenheid == "stuks") {
            ingrString = ingr.aantal + " " + ingr.naam;
        }

        return(
            <Ingredient string={ ingrString } />
        )

    }
    
    render() {
        return(
            <Card style={ Style.tabCardStyle }>
                <CardItem style={ Style.cardItemStyle }>
                    <Text style={ Style.titleStyle }>Ingrediënten</Text>
                </CardItem>
                <CardItem style={ Style.cardItemStyle }>
                    <FlatList
                        data={ this.props.ingredients }
                        keyExtractor={ ingr => ingr.id.toString() }
                        renderItem={ ({item}) => this.renderIngredient(item) }
                        style={{ marginBottom: 20 }}
                        />
                </CardItem>   
            </Card>
        );
    }
}