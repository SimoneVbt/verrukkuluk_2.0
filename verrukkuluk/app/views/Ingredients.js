import React, { Component } from 'react';
import { Pressable } from 'react-native';
import { Container, Content, Text, View, Card, CardItem, Form, Icon, Button, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as style from '../resources/styles/styles';
import * as constants from '../config/constants';
import API from '../api/API.js';
import Head from '../components/Head';
import IngredientPicker from '../components/IngredientPicker';


export default class Ingredients extends Component
{
    state = {
        isLoaded: false,
        error: false,
        articles: [],
        number: 3,
        isLoading: false,
        submitError: false,
        ingredients: [],
        noIngredients: false,
        sameArticles: false
    }

    componentDidMount() {
        let articles = API.fetchData({ url: constants.articlesUrl, table: "artikel", sort: "naam" });
        let ingredients = API.fetchData({ url: constants.ingrUrl, table: "ingredient", id: this.props.dish.id, filter: `gerecht_id = ${this.props.dish.id}` });

        Promise.all([articles, ingredients])
        .then( values => {
            let ingredients = values[1].map( ingr => {
                return {
                    gerecht_id: ingr.gerecht_id,
                    artikel_id: ingr.artikel_id,
                    aantal: ingr.aantal
                }
            });

            this.setState({
                isLoaded: true,
                articles: values[0],
                ingredients: ingredients,
                number: values[1].length > 0 ? values[1].length : 3
            })
        })
        .catch( error => {
            console.warn(error);
            this.setState({
                isLoaded: true,
                error: true
            })
        })
    }


    updateIngrInfo = (obj) => {
        let ingredientsList = this.state.ingredients;
        let ingredient = ingredientsList.find( ingr => ingr.number === obj.number );

        if (ingredient) {
            ingredient.artikel_id = obj.artikel_id;
            ingredient.aantal = obj.aantal;
        } else {
            ingredientsList.push(obj);
        }
        
        this.setState({ ingredients: ingredientsList });
    }


    submit(data) {
        API.postData({
            url: constants.postIngrUrl,
            type: "post",
            table: "ingredient",
            data: data
        })
        .then( result => {
            if (this.props.edit) {
                Actions.MyDishes();
            } else {
                Actions.Preparation({ dish: this.props.dish });
            }
        })
        .catch( error => {
            console.warn(error);
            this.setState({
                isLoading: true,
                submitError: true
            })
        })
    }


    handleDelete = (number) => {
        let ingredientsList = this.state.ingredients;
        let filteredList = ingredientsList.filter( ingr => ingr.number != number );
        this.setState({ ingredients: filteredList });
        
    }


    handleSubmit() {
        let ingredients = this.state.ingredients;
        let list = ingredients.filter( item => item.artikel_id != 0 );

        if (list.length === 0) {
            this.setState({ noIngredients: true, sameArticles: false, submitError: false });
            return;
        }

        let set = new Set();
        if (list.some( item => set.size === set.add(item.artikel_id).size )) {
            this.setState({ sameArticles: true, noIngredients: false, submitError: false });
            return;
        }

        this.setState({
            isLoading: true,
            noIngredients: false,
            sameArticles: false,
            submitError: false
        }, () => { 
            
            this.submit(list);
        })
    }


    renderAddButton() {
        if (this.state.number < 20) {
            return(
                <CardItem style={ style.cardItemStyle }>
                    <Pressable onPress={ () => this.setState( prevState => ({ number: prevState.number + 1 }) ) }
                                    style={{ marginVertical: 10, marginLeft: 5,
                                            flexDirection: "row", justifyContent: "center" }}>
                        <Icon name="add" type="MaterialIcons" style={{ color: style.darkRed }} />
                        <Text style={{ color: style.darkRed, fontStyle: "italic", marginTop: 2 }}>
                            Voeg extra ingrediënten toe...
                        </Text>
                    </Pressable>
                </CardItem>
            )
        }
    }


    renderIngredientPickers() {
        let ingredients = [];
        let i = 0;

        if (this.state.ingredients.length > 0) {
            for (i; i < this.state.ingredients.length; i++) {
                this.state.ingredients[i].number = i+1;
                ingredients.push(
                    <IngredientPicker
                        articles={ this.state.articles }
                        dish={ this.props.dish }
                        number={i+1} key={i+1}
                        updateIngrInfo={ this.updateIngrInfo }
                        handleDelete={ this.handleDelete }
                        ingr={ this.state.ingredients[i] }
                        />
                );
            }
        }
        for (i; i < this.state.number; i++) {
            ingredients.push(
                <IngredientPicker
                    articles={ this.state.articles }
                    dish={ this.props.dish }
                    number={i+1} key={i+1}
                    updateIngrInfo={ this.updateIngrInfo }
                    handleDelete={ this.handleDelete }
                    />
            );
        }
        return ingredients;
    }


    renderForm() {
        if (!this.state.isLoaded) {
            return( <Spinner color={ style.darkRed } size={50} style={{ marginVertical: 10 }} /> )
        
        } else if (this.state.isLoaded && this.state.articles.length > 0) {

            let ingredients = this.renderIngredientPickers();

            return(
                <Form>
                    <CardItem style={ style.cardItemStyle }>
                        <Text style={{ fontSize: 15 }}>
                            Ingrediënten kunnen worden toegevoegd door een ingrediënt te selecteren en een hoeveelheid aan te geven.
                            Ingrediënten kunnen worden verwijderd door de naam terug op "(artikel)" te zetten of door de hoeveelheid 0 aan te geven.
                        </Text>
                    </CardItem>
                    { ingredients }
                    { this.renderAddButton() }
                    <CardItem style={ style.cardItemStyle }>
                        <Button onPress={ () => this.handleSubmit() } style={ style.buttonStyle }>
                            { this.state.isLoading && <Spinner color={ style.white } size={25} style={{ marginLeft: 10, marginRight: -10 }} />}
                            <Text style={ style.buttonTextStyle }>
                                verzenden
                            </Text>
                        </Button>
                    </CardItem>
                </Form>
            )
        }
        return(
            <CardItem style={ style.cardItemStyle }>
                <Text style={{ fontStyle: "italic" }}>
                    Fout bij ophalen van informatie uit de server
                </Text>
            </CardItem>
        )
    }


    renderError() {
        let text = this.state.noIngredients ? "Geen ingrediënten om te versturen" :
                    this.state.sameArticles ? "Kies elk artikel slechts één keer" :
                    this.state.submitError ? "Serverfout bij verzenden gegevens" :
                    "";

        if (text) {
            return(
                <CardItem style={ style.cardItemStyle }>
                    <Text style={ style.messageStyle }>
                        { text }
                    </Text>
                </CardItem>
            )
        }
    }


    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="ingrediënten" newDish />
                <Content style={{ padding: 10 }}>
                    <Card style={ style.cardStyle }>
                        <CardItem style={ style.cardItemStyle }>
                            <Text style={ style.titleStyle }>
                                ingrediënten toevoegen
                            </Text>
                        </CardItem>
                        { this.renderError() }
                        { this.renderForm() }
                    </Card>
                    <View style={{ padding: 10 }} />
                </Content>
            </Container>
        )
    }
}