import React, { Component } from 'react';
import { Card, CardItem, Text, Button, View, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as style from '../resources/styles/styles.js';
import Stars from '../components/Stars';

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
                <CardItem style={ style.cardItemStyle }>
                    <View style={{ flexDirection: "column" }}>
                        <View>
                            <Stars dish={ this.props.dish } type="average" />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ flex: 2, fontSize: 14, fontStyle: "italic" }}>
                                { this.props.dish.calorieen } kcal p.p.
                            </Text>
                            <Text style={{ flex: 1, fontSize: 14, fontStyle: "italic",  textAlign: "right" }}>
                                € { this.props.dish.totale_prijs }
                            </Text>
                        </View>
                    </View>
                    <View style={{ paddingLeft: 15, flexGrow: 1 }}>
                        <Button rounded
                                style={ buttonStyle }
                                onPress={ () => Actions.Detail({ dish_id: this.props.dish.id, title: this.props.dish.titel }) }>
                            <Text style={{ color: style.darkRed, fontSize: 16, fontWeight: "bold" }}>
                                Smullen!
                            </Text>
                        </Button>                        
                    </View>
                </CardItem>
            </Card>
        )
    }
}