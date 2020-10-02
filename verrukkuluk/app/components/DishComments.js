import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Card, CardItem, Text, ListItem, Thumbnail, Left, Body, Right, View, Icon, Button } from 'native-base';
import * as style from '../resources/styles/styles.js';
import API from '../api/API';

export default class DishComments extends Component
{
    state = {
        user: {}
    }


    componentDidMount() {
        let user = API.fetchFromDatabase("gebruiker", 1);
        this.setState({
            user: user
        })
    }


    editComment() {
        console.warn("edit");
    }


    renderEditButton(comm) {
        if (comm.gebruiker_id === this.state.user.id ) {
            return(
                <Button iconRight transparent
                        style={{ alignSelf: "flex-end", marginRight: -20 }}
                        onPress={ () => this.editComment }>
                    <Icon name="edit" type="Entypo" style={{ color: style.darkRed }} />
                </Button>
            )
        }
    }


    renderItem(comm) {
        let date = comm.datum;
        let day = date.slice(8, 10);
        let month = date.slice(5, 7);
        let year = date.slice(0, 4);
        let formattedDate = `${day}-${month}-${year}`;
        
        return(
            <ListItem style={{ marginLeft: 5 }}>
                <Left style={{ flex: 3, flexDirection: "column", alignItems: "center" }}>
                    <Text style={{ color: style.darkRed, fontSize: 10 }} numberOfLines={1}>
                        { comm.gebruikersnaam }
                    </Text>
                    <Thumbnail source={{ uri: comm.foto }} />
                    <Text style={{ fontSize: 10, color: style.darkRed }}>
                        { formattedDate }
                    </Text>
                </Left>
                <Body style={{ flex: 10, flexDirection: "column", marginLeft: 20, marginRight: -10 }}>
                    <Text>
                        { comm.tekstveld }
                    </Text>
                </Body>
                <Right style ={{ flex: 1 }}>
                    { this.renderEditButton(comm) }
                </Right>
            </ListItem>
        )
    }

    renderList() {
        if (this.props.comments.length > 0) {
            return(
                <FlatList
                    data={ this.props.comments }
                    keyExtractor={ comm => comm.id }
                    renderItem={ ({item}) => this.renderItem(item) }
                    style={{ marginBottom: 20 }}
                    />
            )
        } 
        return(
            <View style={{ paddingBottom: 15, backgroundColor: style.beige, marginTop: 5 }}>
                <Text style={{ fontStyle: "italic" }}>
                    Dit gerecht heeft nog geen opmerkingen.
                </Text>
            </View>
        )
        
    }

    render() {
        return(
            <Card style={ style.tabCardStyle }>
                <CardItem style={ style.cardItemStyle }>
                    <Text style={ style.titleStyle }>Opmerkingen</Text>
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    { this.renderList() }        
                </CardItem>
            </Card>
        );
    }
}