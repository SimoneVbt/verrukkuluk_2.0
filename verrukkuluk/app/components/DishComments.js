import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Card, CardItem, Text, ListItem, Thumbnail, Left, Right } from 'native-base';
import { darkRed, cardStyle, tabCardStyle, titleStyle } from '../resources/styles/styles.js';

export default class DishComments extends Component
{
    _renderComment(comm) {

        let comment = comm.tekstveld.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'");

        return(
            <ListItem style={{ marginLeft: 5 }}>
                <Left style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
                    <Thumbnail source={{ uri: comm.foto }} />
                    <Text style={{ color: darkRed, fontSize: 10 }} numberOfLines={1}>
                        { comm.gebruikersnaam }
                    </Text>
                </Left>
                <Right style={{ flex: 4, flexDirection: "column", alignItems: "flex-start", marginLeft: 20, marginRight: -10 }}>
                    <Text>
                        { comment }
                    </Text>                    
                </Right>
            </ListItem>
        )
    }

    render() {
        return(
            <Card style={ tabCardStyle }>
                <CardItem style={ cardStyle }>
                    <Text style={ titleStyle }>Opmerkingen</Text>
                </CardItem>
                <CardItem style={ cardStyle }>
                    <FlatList
                        data={ this.props.comments }
                        keyExtractor={ comm => comm.id.toString() }
                        renderItem={ ({item}) => this._renderComment(item) }
                        style={{ marginBottom: 20 }}
                        />                    
                </CardItem>

            </Card>
        );
    }
}