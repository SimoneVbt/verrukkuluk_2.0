import React, { Component } from 'react';
import { CardItem, Text, View, Button, Spinner, Item, Textarea } from 'native-base';
import * as style from '../resources/styles/styles.js';
import * as constants from '../config/constants';
import API from '../api/API';


export default class NewComment extends Component
{
    state = {
        comment: "",
        isLoading: false,
        error: false,
        emptyError: false
    }


    _submitComment() {
        if (this.state.comment.length != "") {

            this.setState({
                isLoading: true,
                emptyError: false
            });
            
            API.postData({
                url: constants.addInfoUrl,
                type: "post",
                user: true,
                data: { record_type: "O",
                        gerecht_id: this.props.dish_id,
                        tekstveld: this.state.comment }
            }).then( result => {
                this.props.loadCommentData(this.props.dish_id);
                this.setState({
                    isLoading: false,
                    comment: ""
                });
            }).catch( error => {
                console.warn(error);
                this.setState({
                    isLoading: false,
                    error: true
                })
            })         

        } else {
            this.setState({
                emptyError: true
            })
        }

    }


    _handleChange(text) {
        this.setState({
            comment: text
        })
    }
    

    render() {
        return(
            <CardItem style={{ backgroundColor: style.beige, flexDirection: "column", paddingTop: 10, paddingBottom: 0 }}>
                <Item regular style={{ backgroundColor: style.white, borderColor: style.darkRed, marginBottom: 5 }}>
                    <Textarea name="comment"
                            type="text"
                            value={ this.state.comment }
                            placeholder="Plaats een opmerking"
                            onChangeText={ (text) => this._handleChange(text) }
                            style={{ fontStyle: "italic", fontSize: 14, width: "100%" }} />
                </Item>
                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                    <Text style={{ fontStyle: "italic", fontSize: 14 }}>
                        { this.state.error &&
                            "Er is iets misgegaan.\n Probeer later opnieuw."
                        }
                        { this.state.isLoading &&
                            "Opmerking plaatsen..."
                        }
                        { this.state.emptyError &&
                            "Geen opmerking om te plaatsen."
                        }
                    </Text>
                    <Button small
                            style={ style.buttonStyle }
                            onPress={ () => this._submitComment() } >
                        { this.state.isLoading &&
                            <Spinner color={ style.white } size={20} style={{ marginLeft: 5, marginRight: -5 }} />
                        }
                        <Text style={{ color: style.white }}>
                            plaatsen
                        </Text>
                    </Button>                    
                </View>
            </CardItem>
        )
    }
}