import React, { Component } from 'react';
import { Alert } from 'react-native';
import { ListItem, Thumbnail, Left, Body, Right, Text, View, Icon, Button, Spinner } from 'native-base';
import * as style from '../resources/styles/styles.js';
import * as constants from '../config/constants';
import API from '../api/API';

export default class Comment extends Component
{
    state = {
        isLoading: false,
        error: false
    }

    
    _editComment() {
        console.warn("edit");
    }


    _deleteComment() {
        Alert.alert(
            'opmerking verwijderen',
            'Weet je zeker dat je deze opmerking wil verwijderen?',
            [
                {
                    text: 'ja',
                    onPress: () => this._handleDelete(this.props.comment.id)
                },
                {
                    text: 'nee',
                    style: 'cancel'
                }
            ]
        )
    }


    _handleDelete() {
        this.setState({ isLoading: true })
        API.postData({
            url: constants.deleteInfoUrl,
            table: "gerechtinfo",
            type: "delete",
            id: this.props.comment.id
        }).then( result => {
            this.props.loadCommentData();
            this.setState({ isLoading: false });
        }).catch( error => {
            console.warn(error);
            this.setState({ isLoading: false })
        })
    }


    renderUserButtons() {
        if (this.props.comment.gebruiker_id === this.props.user_id ) {
            return(
                <Right style ={{ flex: 1 }}>
                        <Button iconRight transparent
                            style={{ alignSelf: "flex-end", marginRight: -20 }}
                            onPress={ () => this._deleteComment(this.props.comment.id) }>
                        <Icon name="delete" type="AntDesign" style={{ color: style.darkRed, fontSize: 20 }} />
                    </Button>
                    <Button iconRight transparent
                            style={{ alignSelf: "flex-end", marginRight: -20 }}
                            onPress={ () => this._editComment(this.props.comment.id) }>
                        <Icon name="edit" type="Entypo" style={{ color: style.darkRed, fontSize: 20 }} />
                    </Button>
                </Right>
            )
        }
    }


    render() {
        let date = this.props.comment.datum;
        let day = date.slice(8, 10);
        let month = date.slice(5, 7);
        let year = date.slice(0, 4);
        let formattedDate = `${day}-${month}-${year}`;
        
        return(
            <ListItem style={{ marginLeft: 5 }}>
                <Left style={{ flex: 3, flexDirection: "column", alignItems: "center" }}>
                    <Text style={{ color: style.darkRed, fontSize: 10 }} numberOfLines={1}>
                        { this.props.comment.gebruikersnaam }
                    </Text>
                    <Thumbnail source={{ uri: this.props.comment.foto }} />
                    <Text style={{ fontSize: 10, color: style.darkRed }}>
                        { formattedDate }
                    </Text>
                </Left>
                <Body style={{ flex: 10, flexDirection: "column", marginLeft: 20, marginRight: -10 }}>
                    <Text>
                        { this.props.comment.tekstveld }
                    </Text>
                </Body>
                { this.renderUserButtons() }
            </ListItem>
        )
    }
}