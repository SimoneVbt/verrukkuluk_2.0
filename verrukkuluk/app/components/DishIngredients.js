import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Card, CardItem, Text, ListItem, CheckBox } from 'native-base';
import * as style from '../resources/styles/styles.js';
import API from '../api/API.js';


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
                <CheckBox  color={ style.darkRed } style={{ marginLeft: -20 }} checked={ this.state.checked }  />
                <Text>  { this.props.string }</Text>
            </ListItem> 
        )
    }
}


export default class DishIngredients extends Component
{
    state = {
        ingredients: []
    }

    componentDidMount() {
        let ingredients = API.fetchDishIngredients(this.props.dish_id);
        this.setState({ ingredients: ingredients })
    }

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
            <Card style={ style.tabCardStyle }>
                <CardItem style={ style.cardItemStyle }>
                    <Text style={ style.titleStyle }>Ingrediënten</Text>
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    <FlatList
                        data={ this.state.ingredients }
                        keyExtractor={ ingr => ingr.id.toString() }
                        renderItem={ ({item}) => this.renderIngredient(item) }
                        style={{ marginBottom: 10 }}
                        persistentScrollbar
                        />
                </CardItem>   
            </Card>
        );
    }
}