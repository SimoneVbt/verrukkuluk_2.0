import React, { Component } from 'react';
import { Alert } from 'react-native';
import { ListItem, Thumbnail, Left, Body, Right, Text, View, Icon, Button, Spinner } from 'native-base';
import * as style from '../resources/styles/styles.js';
import * as constants from '../config/constants';
import API from '../api/API';
import NewComment from './NewComment';

const overlay = {
    position: 'absolute',
    left: 0, right: 0, top: 0, bottom: 0,    
    backgroundColor: "rgba(255, 255, 251, 0.6)",
    alignItems: 'center',
    justifyContent: 'center'
}

const smallTextStyle = {
    color: style.darkRed,
    fontSize: 10
}


export default class Comment extends Component
{
    state = {
        isLoading: false,
        editMenu: false
    }


    closeEditMenu = (data) => {
        this.setState({ editMenu: false });
        
    }


    deleteComment() {
        this.setState({ isLoading: true }, () => {
            this.props.handleDelete(this.props.comment);
        })
    }


    askForDelete() {
        Alert.alert(
            'opmerking verwijderen',
            'Weet je zeker dat je deze opmerking wil verwijderen?',
            [
                {
                    text: 'ja',
                    onPress: () => this.deleteComment()
                },
                {
                    text: 'nee',
                    style: 'cancel'
                }
            ]
        )
    }


    renderText() {
        if (this.state.editMenu) {
            return(
                <NewComment dish_id={ this.props.comment.gerecht_id }
                            comment={ this.props.comment }
                            handleSubmit={ this.props.handleSubmit }
                            closeEditMenu={ this.closeEditMenu }
                />
            )
        }
        return(
            <Text>
                { this.props.comment.tekstveld }
            </Text>
        )
    }


    renderUserButtons() {
        if (this.props.comment.gebruiker_id === this.props.user_id) {

            if (this.state.editMenu) {
                return(
                    <Right style ={{ flex: 1, marginTop: -60 }}>
                        <Button iconRight transparent
                                style={{ marginRight: -20 }}
                                onPress={ () => this.setState({ editMenu: false }) }>
                            <Icon name="cross" type="Entypo" style={{ color: style.darkRed, fontSize: 30 }} />
                        </Button>
                    </Right>
                )
            }
            return(
                <Right style ={{ flex: 1 }}>
                    <Button iconRight transparent
                            style={{ marginRight: -20 }}
                            onPress={ () => this.askForDelete() }>
                        <Icon name="delete" type="AntDesign" style={{ color: style.darkRed, fontSize: 20 }} />
                    </Button>
                    <Button iconRight transparent
                            style={{ marginRight: -20 }}
                            onPress={ () => this.setState({ editMenu: true }) }>
                        <Icon name="edit" type="Entypo" style={{ color: style.darkRed, fontSize: 20 }} />
                    </Button>
                </Right>
            )
        }
    }


    formatDate(date) {
        let day = date.slice(8, 10);
        let month = date.slice(5, 7);
        let year = date.slice(0, 4);
        return `${day}-${month}-${year}`;
    }


    renderSpinner() {
        if (this.state.isLoading) {
            return(
                <View style={ overlay }>
                    <Spinner color={ style.darkRed } />
                </View>              
            )
        }
    }


    render() {
        const { afbeelding } = this.props.comment;
        return(
            <ListItem style={{ marginLeft: 5 }} >
                <Left style={{ flex: 3, flexDirection: "column", alignItems: "center" }}>
                    <Text style={ smallTextStyle } numberOfLines={1}>
                        { this.props.comment.gebruikersnaam }
                    </Text>
                    <Thumbnail source={{ uri: afbeelding || constants.defaultUser }} />
                    <Text style={ smallTextStyle }>
                        { this.formatDate(this.props.comment.datum) }
                    </Text>
                </Left>
                <Body style={{ flex: 10, flexDirection: "column", marginLeft: 20, marginRight: -10 }}>
                    {
                        this.props.comment.datum_bewerkt &&
                        <Text style={ smallTextStyle }>
                            bewerkt: { this.formatDate(this.props.comment.datum_bewerkt) }
                        </Text>
                    }
                    { this.renderText() }
                </Body>
                { this.renderUserButtons() }
                { this.renderSpinner() }
            </ListItem>
        )
    }
}