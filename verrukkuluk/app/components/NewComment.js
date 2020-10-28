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


    componentDidMount() {
        if (this.props.comment) {
            this.setState({ comment: this.props.comment.tekstveld })
        }
    }


    submitComment() {

        if (this.state.comment === "") {
            this.setState({ emptyError: true  }) 

        } else {
            this.setState({
                isLoading: true,
                emptyError: false
            }, () => {

                const data = {
                    record_type: "O",
                    gerecht_id: this.props.dish_id,
                    tekstveld: this.state.comment
                }
                if (this.props.comment) {
                    data.id = this.props.comment.id;
                }
                
                API.postData({
                    url: constants.addInfoUrl,
                    type: "post",
                    user: true,
                    data: data,
                    edit: true
                })
                .then( result => {
                    this.props.loadCommentData(this.props.dish_id);
                    this.setState({
                        isLoading: false,
                        comment: ""
                    });
                })
                .catch( error => {
                    console.warn(error);
                    this.setState({
                        isLoading: false,
                        error: true
                    })
                })
            });
        }
    }


    handleChange(text) {
        this.setState({
            comment: text
        })
    }


    renderText() {
        if (!this.props.comment) {
            return(
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
            )
        }
    }
    

    render() {
        return(
            <CardItem style={{ backgroundColor: style.beige, flexDirection: "column", paddingTop: 10, paddingBottom: 0 }}>
                <Item regular style={{ backgroundColor: style.white, borderColor: style.darkRed, marginBottom: 5 }}>
                    <Textarea name="comment"
                            type="text"
                            value={ this.state.comment }
                            placeholder="Plaats een opmerking"
                            onChangeText={ (text) => this.handleChange(text) }
                            style={{ fontStyle: "italic", fontSize: 14, width: "100%" }} />
                </Item>
                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                    { this.renderText() }
                    <Button small
                            style={ style.buttonStyle }
                            onPress={ () => this.submitComment() } >
                        { this.state.isLoading &&
                            <Spinner color={ style.white } size={20} style={{ marginLeft: 5, marginRight: -5 }} />
                        }
                        <Text style={{ color: style.white }}>
                            { this.props.comment ? "bewerken" : "plaatsen" }
                        </Text>
                    </Button>
                </View>
            </CardItem>
        )
    }
}