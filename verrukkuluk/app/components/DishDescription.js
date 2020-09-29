import React, { Component } from 'react';
import { Card, CardItem, Text, Icon, Thumbnail, View, Button, Spinner } from 'native-base';
import * as style from '../resources/styles/styles.js';
import * as constants from '../config/constants';
import API from '../api/API';


const txtStyle = {
    paddingBottom: 10
}

const spinnerPosition = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    backgroundColor: "rgb(255, 255, 251)",
    opacity: 0.5
}


export default class DishDescription extends Component
{
    state = {
        isLoading: false
    }


    renderStars() {
        return(
            <View style={{ flexDirection: "row", flex: 2, justifyContent: "flex-start" }}>
                { this.props.dish.gemiddelde_beoordeling >= 1 ?
                    <Icon name="star-sharp" type="Ionicons" style={ style.starStyle } /> :
                    this.props.dish.gemiddelde_beoordeling == 0.5 ?
                    <Icon name="star-half-sharp" type="Ionicons" style={ style.starStyle } /> :
                    <Icon name="star-outline" type="Ionicons" style={ style.starStyle } /> }
                { this.props.dish.gemiddelde_beoordeling >= 2 ?
                    <Icon name="star-sharp" type="Ionicons" style={ style.starStyle } /> : 
                    this.props.dish.gemiddelde_beoordeling == 1.5 ?
                    <Icon name="star-half-sharp" type="Ionicons" style={ style.starStyle } /> :
                    <Icon name="star-outline" type="Ionicons" style={ style.starStyle } /> }
                { this.props.dish.gemiddelde_beoordeling >= 3 ?
                    <Icon name="star-sharp" type="Ionicons" style={ style.starStyle } /> : 
                    this.props.dish.gemiddelde_beoordeling == 2.5 ?
                    <Icon name="star-half-sharp" type="Ionicons" style={ style.starStyle } /> :
                    <Icon name="star-outline" type="Ionicons" style={ style.starStyle } /> }
                { this.props.dish.gemiddelde_beoordeling >= 4 ?
                    <Icon name="star-sharp" type="Ionicons" style={ style.starStyle } /> : 
                    this.props.dish.gemiddelde_beoordeling == 3.5 ?
                    <Icon name="star-half-sharp" type="Ionicons" style={ style.starStyle } /> :
                    <Icon name="star-outline" type="Ionicons" style={ style.starStyle } /> }
                { this.props.dish.gemiddelde_beoordeling == 5 ?
                    <Icon name="star-sharp" type="Ionicons" style={ style.starStyle } /> : 
                    this.props.dish.gemiddelde_beoordeling == 4.5 ?
                    <Icon name="star-half-sharp" type="Ionicons" style={ style.starStyle } /> :
                    <Icon name="star-outline" type="Ionicons" style={ style.starStyle } /> }
            </View>            
        )
    }


    addToList() {
        this.setState({ isLoading: true });
        setTimeout( () => this.setState({ isLoading: false }), 3000 )
    }


    _addFavourite() {

        this.setState({ isLoading: true })
        API.postData({ url: constants.addInfoUrl, data: { record_type: "F",
                                                            gerecht_id: this.props.dish.id,
                                                            user: true } })
            .then( result => {
                this.setState({ isLoading: false });
                this.props.loadDishData(); //callback: undefined
            })
            .catch( error => console.warn(error))
    }


    _deleteFavourite() {
        console.warn("verwijderen");
        this.setState({ isLoading: true });
        setTimeout( () => this.setState({ isLoading: false }), 3000 )
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


    render() {
        return(
            <Card style={ style.tabCardStyle }>
                <CardItem style={ style.cardItemStyle }>
                    <Thumbnail square
                                source={{ uri: this.props.dish.afbeelding }}
                                style={{ width: "100%", height: 150 }} />
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "column" }}>
                            { this.renderStars() }
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 14 }}>
                                    { this.props.dish.calorieen } kcal
                                </Text>
                                <Text style={{ fontSize: 14 }}>
                                    €{ this.props.dish.totale_prijs }
                                </Text>                            
                            </View>
                        </View>
                        <View style={{ flexDirection: "row" }}>
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
                { this.state.isLoading && 
                    <View style={ spinnerPosition }>
                        <Spinner color={ style.darkRed } style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }} />
                    </View>
                }
            </Card>
        )
    }
}