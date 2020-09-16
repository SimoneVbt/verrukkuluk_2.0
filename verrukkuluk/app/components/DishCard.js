import React, { Component } from 'react';
import { Card, CardItem, Text, Button, Icon, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { darkRed, beige, cardStyle, cardItemStyle, titleStyle, starStyle } from '../resources/styles/styles.js';

const buttonStyle = {
    borderColor: darkRed,
    height: 60,
    flex: 2,
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: beige
}


export default class DishCard extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.dish.id,
            title: this.props.dish.titel,
            image: this.props.dish.afbeelding,
            type: this.props.dish.type,
            kitchen: this.props.dish.keuken,
            description_short: this.props.dish.korte_omschrijving,
            description_long: this.props.dish.lange_omschrijving,
            rating: this.props.dish.gemiddelde_beoordeling,
            kcal: this.props.dish.calorieen,
            price: this.props.dish.totale_prijs
        }
    }

    render() {

        let description = this.state.description_short.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'");

        return(
            <Card style={ cardStyle }>
                <CardItem header style={ cardItemStyle }>
                    <Text style={ titleStyle }>
                        { this.state.title }
                    </Text>
                </CardItem>
                <CardItem style={ cardItemStyle }>
                    <Thumbnail square source={{ uri: this.state.image }} style={{ width: "100%", height: 100 }} />
                </CardItem>
                <CardItem style={ cardItemStyle }>
                    <Text style={{ fontStyle: "italic", fontSize: 14, flex: 1, color: darkRed }}>
                        { this.state.type }
                    </Text>
                    <Text style={{ fontStyle: "italic", fontSize: 14, flex: 1, color: darkRed, textAlign: "right" }}>
                        { this.state.kitchen }
                    </Text>
                </CardItem>
                <CardItem style={ cardItemStyle }>
                    <Text style={{ fontSize: 14 }} numberOfLines={4}>
                        { description }
                    </Text>
                </CardItem>
                <Grid>
                    <Col>
                    <CardItem style={ cardItemStyle }>
                        { this.state.rating >= 1 ?
                            <Icon name="star-sharp" type="Ionicons" style={ starStyle } /> :
                            this.state.rating == 0.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ starStyle } /> }
                        { this.state.rating >= 2 ?
                            <Icon name="star-sharp" type="Ionicons" style={ starStyle } /> : 
                            this.state.rating == 1.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ starStyle } /> }
                        { this.state.rating >= 3 ?
                            <Icon name="star-sharp" type="Ionicons" style={ starStyle } /> : 
                            this.state.rating == 2.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ starStyle } /> }
                        { this.state.rating >= 4 ?
                            <Icon name="star-sharp" type="Ionicons" style={ starStyle } /> : 
                            this.state.rating == 3.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ starStyle } /> }
                        { this.state.rating == 5 ?
                            <Icon name="star-sharp" type="Ionicons" style={ starStyle } /> : 
                            this.state.rating == 4.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ starStyle } /> }
                    </CardItem>
                    <CardItem footer style={ cardItemStyle }>
                        <Text style={{ flex: 2, fontSize: 14, fontStyle: "italic" }}>
                            { this.state.kcal } kcal p.p.
                        </Text>
                        <Text style={{ flex: 1, fontSize: 14, fontStyle: "italic",  textAlign: "right" }}>
                            € { this.state.price }
                        </Text>
                    </CardItem>
                    </Col>
                    <Col>
                        <CardItem style={ cardItemStyle }>
                            <Button rounded style={ buttonStyle } onPress={ () => Actions.Detail({ dish: this.state }) }>
                                <Text style={{ color: darkRed, fontSize: 16, fontWeight: "bold" }}>
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