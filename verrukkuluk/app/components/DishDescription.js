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
                                source={{ uri: this.props.dish.image }}
                                style={{ width: "100%", height: 150 }} />
                </CardItem>
                <CardItem style={ Style.cardItemStyle }>
                    <View style={{ flexDirection: "row", flex: 2, justifyContent: "flex-start" }}>
                        { this.props.dish.avgRating >= 1 ?
                            <Icon name="star-sharp" type="Ionicons" style={ Style.starStyle } /> :
                            this.state.avgRating == 0.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ Style.starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ Style.starStyle } /> }
                        { this.props.dish.avgRating >= 2 ?
                            <Icon name="star-sharp" type="Ionicons" style={ Style.starStyle } /> : 
                            this.props.dish.avgRating == 1.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ Style.starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ Style.starStyle } /> }
                        { this.props.dish.avgRating >= 3 ?
                            <Icon name="star-sharp" type="Ionicons" style={ Style.starStyle } /> : 
                            this.props.dish.avgRating == 2.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ Style.starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ Style.starStyle } /> }
                        { this.props.dish.avgRating >= 4 ?
                            <Icon name="star-sharp" type="Ionicons" style={ Style.starStyle } /> : 
                            this.props.dish.avgRating == 3.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ Style.starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ Style.starStyle } /> }
                        { this.props.dish.avgRating == 5 ?
                            <Icon name="star-sharp" type="Ionicons" style={ Style.starStyle } /> : 
                            this.props.dish.avgRating == 4.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ Style.starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ Style.starStyle } /> }
                    </View>
                    <Text style={{ flex: 1, textAlign: "right", fontSize: 14 }}>
                        { this.props.dish.kcal } kcal
                    </Text>
                    <Text style={{ flex: 1, textAlign: "right", fontSize: 14 }}>
                        €{ this.props.dish.price }
                    </Text>
                </CardItem>
                <CardItem style={ Style.cardItemStyle }>
                    <Text style={ Style.titleStyle }>
                        { this.props.dish.title }
                    </Text>
                </CardItem>
                <CardItem style={ Style.cardItemStyle }>
                    <Text style={{ fontStyle: "italic", fontSize: 14, flex: 1, color: Style.darkRed }}>
                        { this.props.dish.type }
                    </Text>
                    <Text style={{ fontStyle: "italic", fontSize: 14, flex: 1, color: Style.darkRed, textAlign: "right" }}>
                        { this.props.dish.kitchen }
                    </Text>
                </CardItem>
                <CardItem style={ Style.cardItemStyle }>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={ txtStyle }>
                            { this.props.dish.description_long }
                        </Text >
                    </View>
                </CardItem>
            </Card>
        )
    }
}