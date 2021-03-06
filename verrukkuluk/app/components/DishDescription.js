import React, { Component } from 'react';
import { Pressable } from 'react-native';
import { Card, CardItem, Text, Icon, Thumbnail, View, Button, Spinner } from 'native-base';
import * as style from '../resources/styles/styles.js';
import * as constants from '../config/constants';
import API from '../api/API';
import RatingMenu from '../components/RatingMenu';
import Stars from '../components/Stars';
import ShoppingMenu from '../components/ShoppingMenu';

const txtStyle = {
    paddingBottom: 10
}


export default class DishDescription extends Component
{
    state = {
        isLoading: false,
        error: false,
        ratingMenuVisible: false,
        shoppingMenuVisible: false
    }


    _handleFavourite(addOrDelete) {
        this.setState({ isLoading: true }, () => {

            let apiData = addOrDelete === "add" ?
                            { url: constants.addInfoUrl,
                                type: "post",
                                data: { record_type: "F", gerecht_id: this.props.dish.id },
                                user: true
                            } :
                        addOrDelete === "delete" ?
                            { url: constants.deleteInfoUrl,
                                type: "delete",
                                favo: true,
                                id: this.props.dish.favoriet_id,
                                gerecht_id: this.props.dish.id
                            } : false;

            API.postData(apiData)
            .then( result => {
                this.props.loadDishData(this.props.dish.id);
                this.setState({ isLoading: false })
            })                
            .catch( error => 
                this.setState({ 
                    isLoading: false,
                    error: true
                })
            );            
        })

    }


    renderFavouriteButton() {
        if (this.props.dish.favoriet) {
            return(
                <Button bordered
                        onPress={ () => this._handleFavourite("delete") }
                        style={{ height: "80%", marginRight: 5, borderColor: style.darkRed, paddingHorizontal: 1 }}>
                    <Icon name="star" type="FontAwesome" style={{ color: style.darkRed }} />
                </Button>
            )
        }
        return(
            <Button onPress={ () => this._handleFavourite("add") }
                    style={{ backgroundColor: style.darkRed, height: "80%", marginRight: 5 }}>
                <Icon name="star-o" type="FontAwesome" />
                <Icon name="add" type="MaterialIcons"
                        style={{ fontSize: 15, alignSelf: "flex-start",
                                marginLeft: -15, marginRight: 5 }} />
            </Button>
        )
    }


    setRatingMenuVisible = (bool) => {
        this.setState({ ratingMenuVisible: bool })
    }

    setShoppingMenuVisible = (bool) => {
        this.setState({ shoppingMenuVisible: bool })
    }


    renderRatingMenu(ratingMenuVisible) {
        return(
            <RatingMenu ratingMenuVisible={ ratingMenuVisible }
                        setRatingMenuVisible={ this.setRatingMenuVisible }
                        dish={ this.props.dish }
                        loadDishData={ this.props.loadDishData } />
        )
    }

    renderShoppingMenu(shoppingMenuVisible) {
        let dish_id = this.props.dish.id;
        let ingredients = API.fetchDishIngredients(dish_id);
        return(
            <ShoppingMenu shoppingMenuVisible={ shoppingMenuVisible }
                            setShoppingMenuVisible={ this.setShoppingMenuVisible }
                            ingredients={ ingredients }
                            dish_id={dish_id } />
        )
    }


    render() {
        const { ratingMenuVisible } = this.state;
        const { shoppingMenuVisible } = this.state;
        return(
            <Card style={ style.tabCardStyle }>
                { this.renderRatingMenu(ratingMenuVisible) }
                { this.renderShoppingMenu(shoppingMenuVisible) }
                <CardItem style={ style.cardItemStyle }>
                    <Thumbnail square
                                source={{ uri: this.props.dish.afbeelding }}
                                style={{ width: "100%", height: 150 }} />
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    <View style={{ width: "100%", flexDirection: "row" }}>
                        <Pressable style={{ flexDirection: "column" }} onPress={ () => this.setRatingMenuVisible(!ratingMenuVisible) }>
                            <View style={{ flex: 2 }}>
                                <Stars dish={ this.props.dish } type={ this.props.dish.waardering ? "personal" : "average" } />
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 14 }}>
                                    { this.props.dish.calorieen } kcal
                                </Text>
                                <Text style={{ fontSize: 14 }}>
                                    €{ this.props.dish.totale_prijs }
                                </Text>                            
                            </View>
                        </Pressable>
                        <View style={{ flexDirection: "row", justifyContent: "flex-end", flexGrow: 1 }}>
                            { this.renderFavouriteButton() }
                            <Button onPress={ () => this.setShoppingMenuVisible(!shoppingMenuVisible) }
                                    style={{ backgroundColor: style.darkRed, height: "80%" }}>
                                <Icon name="shopping-cart" type="FontAwesome" />
                                <Icon name="add" type="MaterialIcons" style={{ fontSize: 15, alignSelf: "flex-start", marginLeft: -15, marginRight: 5 }} />
                            </Button>                            
                        </View>
                    </View>
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    <Text style={ style.titleStyle }>
                        { this.props.dish.titel }
                    </Text>
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    <Text style={{ fontStyle: "italic", fontSize: 14, flex: 1, color: style.darkRed }}>
                        { this.props.dish.type }
                    </Text>
                    <Text style={{ fontStyle: "italic", fontSize: 14, flex: 1, color: style.darkRed, textAlign: "right" }}>
                        { this.props.dish.keuken }
                    </Text>
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={ txtStyle }>
                            { this.props.dish.lange_omschrijving }
                        </Text >
                    </View>
                </CardItem>
                { this.state.error && 
                    <View style={ style.overlay }>
                        <Text style={{ fontSize: 20, padding: 20, color: style.darkRed, fontWeight: "bold", opacity: 1 }}>
                            Er is iets mis gegaan. Vernieuw de pagina en probeer opnieuw.
                        </Text>
                    </View>               
                }
                { this.state.isLoading && 
                    <View style={ style.overlay }>
                        <Spinner color={ style.darkRed } size={80} style={{ marginBottom: 230 }} />
                    </View>
                }
            </Card>
        )
    }
}