import React, { Component } from 'react';
import { Alert } from 'react-native';
import { CardItem, Text, Button, Icon, Thumbnail, Grid, Col, Row } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as Style from '../resources/styles/styles.js';

const buttonStyle = {
    borderColor: Style.darkRed,
    height: 50,
    justifyContent: "center",
    borderWidth: 2,
    backgroundColor: Style.beige,
    width: "90%",
    alignSelf: "flex-end"
}

const rowStyle = {
    paddingVertical: 5
}


export default class Favorite extends Component
{
    renderStars() {
        const rating = this.props.dish.waardering;
        if (rating > 0) {
            return(
                <Row>
                    { rating >= 1 ? <Icon name="star-sharp" type="Ionicons" style={ Style.ratedStarStyle } /> :
                    rating == 0.5 ? <Icon name="star-half-sharp" type="Ionicons" style={ Style.ratedStarStyle } /> :
                                    <Icon name="star-outline" type="Ionicons" style={ Style.ratedStarStyle } /> }
                    { rating >= 2 ? <Icon name="star-sharp" type="Ionicons" style={ Style.ratedStarStyle } /> : 
                    rating == 1.5 ? <Icon name="star-half-sharp" type="Ionicons" style={ Style.ratedStarStyle } /> :
                                    <Icon name="star-outline" type="Ionicons" style={ Style.ratedStarStyle } /> }
                    { rating >= 3 ? <Icon name="star-sharp" type="Ionicons" style={ Style.ratedStarStyle } /> : 
                    rating == 2.5 ? <Icon name="star-half-sharp" type="Ionicons" style={ Style.ratedStarStyle } /> :
                                    <Icon name="star-outline" type="Ionicons" style={ Style.ratedStarStyle } /> }
                    { rating >= 4 ? <Icon name="star-sharp" type="Ionicons" style={ Style.ratedStarStyle } /> : 
                    rating == 3.5 ? <Icon name="star-half-sharp" type="Ionicons" style={ Style.ratedStarStyle } /> :
                                    <Icon name="star-outline" type="Ionicons" style={ Style.ratedStarStyle } /> }
                    { rating == 5 ? <Icon name="star-sharp" type="Ionicons" style={ Style.ratedStarStyle } /> : 
                    rating == 4.5 ? <Icon name="star-half-sharp" type="Ionicons" style={ Style.ratedStarStyle } /> :
                                    <Icon name="star-outline" type="Ionicons" style={ Style.ratedStarStyle } /> } 
                </Row>
            )
        }
        return(
            <Row>
                <Text style={{ fontStyle: "italic", fontSize: 14 }}>
                    geen waardering gegeven
                </Text>
            </Row>
        )
    }


    deleteFavorite() {
        Alert.alert(
            'Favoriet verwijderen',
            `Weet je zeker dat je \"${ this.props.dish.titel }\" uit je favorieten wil verwijderen?`,
            [
                {
                    text: 'ja',
                    onPress: () => this.props.handleDelete(this.props.dish.id)
                },
                {
                    text: 'nee',
                    style: 'cancel'
                }
            ]
        )
    }


    render() {
        return(
            <CardItem style={{ backgroundColor: Style.beige, flexDirection: "column", 
                                borderWidth: 1, borderColor: Style.darkRed, margin: 5 }}>
                <Grid style={{ width: "100%" }}>
                    <Row>
                        <Col size={3}>
                            <Text style={ Style.subtitleStyle }>
                                { this.props.dish.titel }
                            </Text>   
                        </Col>
                        <Col size={1}>
                            <Button style={{ alignSelf: "flex-end" }}
                                    iconLeft transparent
                                    onPress={ () => this.deleteFavorite() }>
                                <Icon name="delete" type="AntDesign" style={{ color: Style.darkRed }} />
                            </Button>
                        </Col>
                    </Row>
                    <Row style={ rowStyle }>
                        <Col>
                            <Thumbnail square
                                        style={{ width: "80%", height: 80 }}
                                        source={{ uri: this.props.dish.afbeelding }} />
                        </Col>
                        <Col>
                            <Text style={{ fontSize: 14 }} numberOfLines={4}>
                                { this.props.dish.korte_omschrijving }
                            </Text>
                        </Col>                        
                    </Row>
                    <Row style={ rowStyle }>
                        <Col>
                            <Text>Eigen waardering:</Text>
                            { this.renderStars() }
                        </Col>
                        <Col style={{ justifyContent: "flex-end" }}>
                            <Button rounded
                                    style={ buttonStyle }
                                    onPress={ () => Actions.Detail({ dish: this.props.dish }) }>
                                <Text style={{ color: Style.darkRed, fontSize: 16, fontWeight: "bold" }}>
                                    recept
                                </Text>
                            </Button>
                        </Col>
                    </Row>
                </Grid>
            </CardItem>
        )
    }
}