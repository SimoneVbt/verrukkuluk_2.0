import React, { Component } from 'react';
import { Card, CardItem, Text, Icon, Thumbnail, View } from 'native-base';
import * as Style from '../resources/styles/styles.js';


const txtStyle = {
    paddingBottom: 10
}


export default class DishDescription extends Component
{
    render() {
        return(
            <Card style={ Style.tabCardStyle }>
                <CardItem style={ Style.cardItemStyle }>
                    <Thumbnail square
                                source={{ uri: this.props.dish.afbeelding }}
                                style={{ width: "100%", height: 150 }} />
                </CardItem>
                <CardItem style={ Style.cardItemStyle }>
                    <View style={{ flexDirection: "row", flex: 2, justifyContent: "flex-start" }}>
                        { this.props.dish.gemiddelde_beoordeling >= 1 ?
                            <Icon name="star-sharp" type="Ionicons" style={ Style.starStyle } /> :
                            this.props.dish.gemiddelde_beoordeling == 0.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ Style.starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ Style.starStyle } /> }
                        { this.props.dish.gemiddelde_beoordeling >= 2 ?
                            <Icon name="star-sharp" type="Ionicons" style={ Style.starStyle } /> : 
                            this.props.dish.gemiddelde_beoordeling == 1.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ Style.starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ Style.starStyle } /> }
                        { this.props.dish.gemiddelde_beoordeling >= 3 ?
                            <Icon name="star-sharp" type="Ionicons" style={ Style.starStyle } /> : 
                            this.props.dish.gemiddelde_beoordeling == 2.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ Style.starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ Style.starStyle } /> }
                        { this.props.dish.gemiddelde_beoordeling >= 4 ?
                            <Icon name="star-sharp" type="Ionicons" style={ Style.starStyle } /> : 
                            this.props.dish.gemiddelde_beoordeling == 3.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ Style.starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ Style.starStyle } /> }
                        { this.props.dish.gemiddelde_beoordeling == 5 ?
                            <Icon name="star-sharp" type="Ionicons" style={ Style.starStyle } /> : 
                            this.props.dish.gemiddelde_beoordeling == 4.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ Style.starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ Style.starStyle } /> }
                    </View>
                    <Text style={{ flex: 1, textAlign: "right", fontSize: 14 }}>
                        { this.props.dish.calorieen } kcal
                    </Text>
                    <Text style={{ flex: 1, textAlign: "right", fontSize: 14 }}>
                        €{ this.props.dish.totale_prijs }
                    </Text>
                </CardItem>
                <CardItem style={ Style.cardItemStyle }>
                    <Text style={ Style.titleStyle }>
                        { this.props.dish.titel }
                    </Text>
                </CardItem>
                <CardItem style={ Style.cardItemStyle }>
                    <Text style={{ fontStyle: "italic", fontSize: 14, flex: 1, color: Style.darkRed }}>
                        { this.props.dish.type }
                    </Text>
                    <Text style={{ fontStyle: "italic", fontSize: 14, flex: 1, color: Style.darkRed, textAlign: "right" }}>
                        { this.props.dish.keuken }
                    </Text>
                </CardItem>
                <CardItem style={ Style.cardItemStyle }>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={ txtStyle }>
                            { this.props.dish.lange_omschrijving }
                        </Text >
                    </View>
                </CardItem>
            </Card>
        )
    }
}