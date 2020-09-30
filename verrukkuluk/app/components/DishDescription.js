import React, { Component } from 'react';
import { Modal, Alert, Pressable } from 'react-native';
import { Card, CardItem, Text, Icon, Thumbnail, View, Button, Spinner, Grid, Col, Row } from 'native-base';
import * as style from '../resources/styles/styles.js';
import * as constants from '../config/constants';
import API from '../api/API';


const txtStyle = {
    paddingBottom: 10
}

const overlay = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    backgroundColor: "rgba(255, 255, 251, 0.5)",
}


export default class DishDescription extends Component
{
    state = {
        isLoading: false,
        error: false,
        ratingMenuVisible: false
    }


    renderStars() {
        let rating = this.props.dish.waardering ? this.props.dish.waardering : this.props.dish.gemiddelde_beoordeling;
        let ratingStyle = this.props.dish.waardering ? style.ratedStarStyle : style.starStyle;

        return(
            <View style={{ flexDirection: "row", flex: 2, alignItems: "center" }}>
                { rating >= 1 ? <Icon name="star-sharp" type="Ionicons" style={ ratingStyle } /> :
                rating == 0.5 ? <Icon name="star-half-sharp" type="Ionicons" style={ ratingStyle } /> :
                                <Icon name="star-outline" type="Ionicons" style={ ratingStyle } /> }
                { rating >= 2 ? <Icon name="star-sharp" type="Ionicons" style={ ratingStyle } /> : 
                rating == 1.5 ? <Icon name="star-half-sharp" type="Ionicons" style={ ratingStyle } /> :
                                <Icon name="star-outline" type="Ionicons" style={ ratingStyle } /> }
                { rating >= 3 ? <Icon name="star-sharp" type="Ionicons" style={ ratingStyle } /> : 
                rating == 2.5 ? <Icon name="star-half-sharp" type="Ionicons" style={ ratingStyle } /> :
                                <Icon name="star-outline" type="Ionicons" style={ ratingStyle } /> }
                { rating >= 4 ? <Icon name="star-sharp" type="Ionicons" style={ ratingStyle } /> : 
                rating == 3.5 ? <Icon name="star-half-sharp" type="Ionicons" style={ ratingStyle } /> :
                                <Icon name="star-outline" type="Ionicons" style={ ratingStyle } /> }
                { rating == 5 ? <Icon name="star-sharp" type="Ionicons" style={ ratingStyle } /> : 
                rating == 4.5 ? <Icon name="star-half-sharp" type="Ionicons" style={ ratingStyle } /> :
                                <Icon name="star-outline" type="Ionicons" style={ ratingStyle } /> } 
            </View>            
        )
    }


    addToList() {
        this.setState({ isLoading: true });
        setTimeout( () => this.setState({ isLoading: false }), 3000 )
    }


    _addFavourite() {
        this.setState({ isLoading: true })
        API.postData({ url: constants.addInfoUrl, write: true,
                        data: { record_type: "F", gerecht_id: this.props.dish.id, user: true } })
            .then( result => {
                this.props.loadDishData(this.props.dish.id);
                this.setState({ isLoading: false })
            })                
            .catch( error => 
                this.setState({ 
                    isLoading: false,
                    error: true
                }));
    }


    _deleteFavourite() {
        this.setState({ isLoading: true });
        API.deleteData({ url: constants.deleteFavoUrl,
                        table: "gerecht",
                        user: true,
                        id: this.props.dish.id,
                        favo: true })
            .then( result => {
                this.props.loadDishData(this.props.dish.id);
                this.setState({ isLoading: false });
            })
            .catch( error =>
                this.setState({ 
                    isLoading: false,
                    error: true
            }));
    }


    renderFavouriteButton() {
        if (this.props.dish.favoriet) {
            return(
                <Button bordered
                        onPress={ () => this._deleteFavourite() }
                        style={{ height: "80%", marginRight: 5, borderColor: style.darkRed, paddingHorizontal: 1 }}>
                    <Icon name="star" type="FontAwesome" style={{ color: style.darkRed }} />
                </Button>
            )
        }
        return(
            <Button onPress={ () => this._addFavourite() }
                    style={{ backgroundColor: style.darkRed, height: "80%", marginRight: 5 }}>
                <Icon name="star-o" type="FontAwesome" />
                <Icon name="add" type="MaterialIcons"
                        style={{ fontSize: 15, alignSelf: "flex-start",
                                marginLeft: -15, marginRight: 5 }} />
            </Button>
        )
    }


    setRatingMenuVisible = (visible) => {
        this.setState({ ratingMenuVisible: visible })
    }


    //grid: height wordt 100%
    //kruisje: in rechterbovenhoek
    renderModal(ratingMenuVisible) {
        return(
            <Modal visible={ ratingMenuVisible } transparent>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={ overlay }>
                        <View style={{ backgroundColor: style.beige, flexDirection: "row",
                                        marginTop: 150, padding: 20,
                                        borderColor: style.darkRed, borderWidth: 2 }}>
                            <View>
                                <Text>Heeeeeeeey</Text>
                            </View>
                            <Button transparent 
                                    onPress={ () => this.setRatingMenuVisible(!ratingMenuVisible) }>
                                <Icon name="cross" type="Entypo" style={{ color: style.darkRed, fontSize: 30 }} />
                            </Button>
                        </View>                      
                    </View>
                </View>
            </Modal>
        )
    }


    render() {
        const { ratingMenuVisible } = this.state;
        return(
            <Card style={ style.tabCardStyle }>
                { this.renderModal(ratingMenuVisible) }
                <CardItem style={ style.cardItemStyle }>
                    <Thumbnail square
                                source={{ uri: this.props.dish.afbeelding }}
                                style={{ width: "100%", height: 150 }} />
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    <View style={{ width: "100%", flexDirection: "row" }}>
                        <Pressable style={{ flexDirection: "column" }} onPress={ () => this.setRatingMenuVisible(!ratingMenuVisible) }>
                            { this.renderStars() }
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
                            <Button onPress={ () => this.addToList() }
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
                     <View style={ overlay }>
                        <Text style={{ fontSize: 20, padding: 20, color: style.darkRed, fontWeight: "bold", opacity: 1 }}>
                            Er is iets mis gegaan. Vernieuw de pagina en probeer opnieuw.
                        </Text>
                    </View>               
                }
                { this.state.isLoading && 
                    <View style={ overlay }>
                        <Spinner color={ style.darkRed } style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }} />
                    </View>
                }
            </Card>
        )
    }
}