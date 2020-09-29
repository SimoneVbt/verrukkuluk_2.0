import React, { Component } from 'react';
import { Card, CardItem, Text, Button, Icon, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as style from '../resources/styles/styles.js';

const buttonStyle = {
    borderColor: style.darkRed,
    height: 60,
    flex: 2,
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: style.beige
}


export default class DishCard extends Component
{
    renderStars() {
        return(
            <CardItem style={ style.cardItemStyle }>
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
            </CardItem>
        )
    }

    
    render() {
        return(
            <Card style={ style.cardStyle }>
                <CardItem header style={ style.cardItemStyle }>
                    <Text style={ style.titleStyle }>
                        { this.props.dish.titel }
                    </Text>
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    <Thumbnail square
                                source={{ uri: this.props.dish.afbeelding }}
                                style={{ width: "100%", height: 100 }} />
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
                    <Text style={{ fontSize: 14 }} numberOfLines={4}>
                        { this.props.dish.korte_omschrijving }
                    </Text>
                </CardItem>
                <Grid>
                    <Col>
                    { this.renderStars() }
                    <CardItem footer style={ style.cardItemStyle }>
                        <Text style={{ flex: 2, fontSize: 14, fontStyle: "italic" }}>
                            { this.props.dish.calorieen } kcal p.p.
                        </Text>
                        <Text style={{ flex: 1, fontSize: 14, fontStyle: "italic",  textAlign: "right" }}>
                            € { this.props.dish.totale_prijs }
                        </Text>
                    </CardItem>
                    </Col>
                    <Col>
                        <CardItem style={ style.cardItemStyle }>
                            <Button rounded
                                    style={ buttonStyle }
                                    onPress={ () => Actions.Detail({ dish_id: this.props.dish.id, title: this.props.dish.titel }) }>
                                <Text style={{ color: style.darkRed, fontSize: 16, fontWeight: "bold" }}>
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