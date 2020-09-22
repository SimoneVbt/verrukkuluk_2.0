import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Card, CardItem, Text, ListItem, Thumbnail, Left, Right, View } from 'native-base';
import * as Style from '../resources/styles/styles.js';

export default class DishComments extends Component
{
    renderItem(comm) {
        return(
            <ListItem style={{ marginLeft: 5 }}>
                <Left style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
                    <Thumbnail source={{ uri: comm.foto }} />
                    <Text style={{ color: Style.darkRed, fontSize: 10 }} numberOfLines={1}>
                        { comm.gebruikersnaam }
                    </Text>
                </Left>
                <Right style={{ flex: 4, flexDirection: "column", alignItems: "flex-start", marginLeft: 20, marginRight: -10 }}>
                    <Text>
                        { comm.tekstveld }
                    </Text>                    
                </Right>
            </ListItem>
        )
    }

    renderList() {
        if (this.props.comments.length > 0) {
            return(
                <FlatList
                    data={ this.props.comments }
                    keyExtractor={ comm => comm.id.toString() }
                    renderItem={ ({item}) => this.renderItem(item) }
                    style={{ marginBottom: 20 }}
                    />     
            )
        } 
        return(
            <View style={{ paddingBottom: 15, backgroundColor: Style.beige, marginTop: 5 }}>
                <Text style={{ fontStyle: "italic" }}>
                    Dit gerecht heeft nog geen opmerkingen.
                </Text>
            </View>
        )
        
    }

    render() {
        return(
            <Card style={ Style.tabCardStyle }>
                <CardItem style={ Style.cardItemStyle }>
                    <Text style={ Style.titleStyle }>Opmerkingen</Text>
                </CardItem>
                <CardItem style={ Style.cardItemStyle }>
                    { this.renderList() }        
                </CardItem>
            </Card>
        );
    }
}