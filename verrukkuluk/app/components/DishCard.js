import React, { Component } from 'react';
import { Card, CardItem, Text, Button, Icon, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as Style from '../resources/styles/styles.js';

const buttonStyle = {
    borderColor: Style.darkRed,
    height: 60,
    flex: 2,
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: Style.beige
}


export default class DishCard extends Component
{
    state = {
        id: this.props.dish.id,
        title: this.props.dish.titel,
        image: this.props.dish.afbeelding,
        type: this.props.dish.type,
        kitchen: this.props.dish.keuken,
        description_short: this.props.dish.korte_omschrijving,
        description_long: this.props.dish.lange_omschrijving,
        avgRating: this.props.dish.gemiddelde_beoordeling,
        kcal: this.props.dish.calorieen,
        price: this.props.dish.totale_prijs,
        rating: this.props.dish.waardering,
        favorite: this.props.dish.favoriet
    }

    render() {

        return(
            <Card style={ Style.cardStyle }>
                <CardItem header style={ Style.cardItemStyle }>
                    <Text style={ Style.titleStyle }>
                        { this.state.title }
                    </Text>
                </CardItem>
                <CardItem style={ Style.cardItemStyle }>
                    <Thumbnail square
                                source={{ uri: this.state.image }}
                                style={{ width: "100%", height: 100 }} />
                </CardItem>
                <CardItem style={ Style.cardItemStyle }>
                    <Text style={{ fontStyle: "italic", fontSize: 14, flex: 1, color: Style.darkRed }}>
                        { this.state.type }
                    </Text>
                    <Text style={{ fontStyle: "italic", fontSize: 14, flex: 1, color: Style.darkRed, textAlign: "right" }}>
                        { this.state.kitchen }
                    </Text>
                </CardItem>
                <CardItem style={ Style.cardItemStyle }>
                    <Text style={{ fontSize: 14 }} numberOfLines={4}>
                        { this.state.description_short }
                    </Text>
                </CardItem>
                <Grid>
                    <Col>
                    <CardItem style={ Style.cardItemStyle }>
                        { this.state.avgRating >= 1 ?
                            <Icon name="star-sharp" type="Ionicons" style={ Style.starStyle } /> :
                            this.state.avgRating == 0.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ Style.starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ Style.starStyle } /> }
                        { this.state.avgRating >= 2 ?
                            <Icon name="star-sharp" type="Ionicons" style={ Style.starStyle } /> : 
                            this.state.avgRating == 1.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ Style.starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ Style.starStyle } /> }
                        { this.state.avgRating >= 3 ?
                            <Icon name="star-sharp" type="Ionicons" style={ Style.starStyle } /> : 
                            this.state.avgRating == 2.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ Style.starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ Style.starStyle } /> }
                        { this.state.avgRating >= 4 ?
                            <Icon name="star-sharp" type="Ionicons" style={ Style.starStyle } /> : 
                            this.state.avgRating == 3.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ Style.starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ Style.starStyle } /> }
                        { this.state.avgRating == 5 ?
                            <Icon name="star-sharp" type="Ionicons" style={ Style.starStyle } /> : 
                            this.state.avgRating == 4.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ Style.starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ Style.starStyle } /> }
                    </CardItem>
                    <CardItem footer style={ Style.cardItemStyle }>
                        <Text style={{ flex: 2, fontSize: 14, fontStyle: "italic" }}>
                            { this.state.kcal } kcal p.p.
                        </Text>
                        <Text style={{ flex: 1, fontSize: 14, fontStyle: "italic",  textAlign: "right" }}>
                            € { this.state.price }
                        </Text>
                    </CardItem>
                    </Col>
                    <Col>
                        <CardItem style={ Style.cardItemStyle }>
                            <Button rounded
                                    style={ buttonStyle }
                                    onPress={ () => Actions.Detail({ dish: this.state }) }>
                                <Text style={{ color: Style.darkRed, fontSize: 16, fontWeight: "bold" }}>
                                    Smullen!
                                </Text>
                            </Button>
                        </CardItem>
                    </Col>
                </Grid>
            </Card>
        )
    }
}