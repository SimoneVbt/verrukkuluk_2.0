import React, { Component } from 'react';
import { View, Text, Left, Body, Right, CardItem, Thumbnail, Button } from 'native-base';
import * as style from '../resources/styles/styles';


export default class Article extends Component
{
    render() {
        return(
            <CardItem style={ style.cardItemStyle }>
                <Left style={{ flex: 2 }}>
                    <Thumbnail source={{ uri: this.props.item.afbeelding }} />
                </Left>
                <Body style={{ flex: 3 }}>
                    <Text>
                        { this.props.item.product }
                    </Text>
                    <Text style={{ fontSize: 14, fontStyle: "italic" }}>
                        { this.props.item.verpakking } { this.props.item.eenheid }
                    </Text>
                </Body>
                <Right style={{ flex: 1 }}>
                    <Button bordered style={{ borderColor: style.darkRed }}>
                        <Text style={{ color: "#333" }}>
                            { this.props.item.aantal_verpakkingen }
                        </Text>                        
                    </Button>
                    <Text>
                        € { this.props.item.totale_prijs.toFixed(2).toString().replace(".", ",") }
                    </Text>
                </Right>
            </CardItem>
        )
    }
}