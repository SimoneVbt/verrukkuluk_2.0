import React, { Component } from 'react';
import { View, Text, Left, Body, Right, CardItem, Thumbnail, Button, Icon, Spinner } from 'native-base';
import * as style from '../resources/styles/styles';
import * as constants from '../config/constants';
import API from '../api/API';

export default class ShopArticle extends Component
{
    state = {
        isLoading: false,
        error: false,
        added: false
    }


    componentDidUpdate(prevProps) {
        if (prevProps.allAdded != this.props.allAdded) {
            this.setState({
                added: this.props.allAdded
            })
        }
    }

    
    addArticle() {
        this.setState({ isLoading: true }, () => {
            API.postData({ 
                url: constants.addToListUrl,
                type: "post",
                data: { 
                    artikel_id: this.props.article.artikel_id,
                    aantal: this.props.article.aantal
                },
                user: true
            })
            .then( result => 
                this.setState({
                    isLoading: false,
                    added: true
                }) 
            )
            .catch( error =>
                this.setState({
                    isLoading: false,
                    error: true
                })
            )            
        });
    }


    render() {
        const totalAmount = Math.ceil(this.props.article.aantal / this.props.article.verpakking);
        const totalPrice = totalAmount * this.props.article.prijs;
        return(
            <CardItem style={ style.cardItemStyle }>
                <Left style={{ flex: 1, marginLeft: -15 }}>
                    <Thumbnail source={{ uri: this.props.article.afbeelding }} />
                </Left>
                <Body style={{ flex: 2, marginHorizontal: 10, marginVertical: 5 }}>
                    {
                        this.state.error &&
                        <Text style={{ color: style.darkRed, fontSize: 12, fontStyle: "italic" }}>
                            Er is iets fout gegaan.
                        </Text>
                    }
                    <Text>
                        { this.props.article.naam }
                    </Text>
                    <Text style={{ fontSize: 14, fontStyle: "italic" }}>
                        { totalAmount } x { this.props.article.verpakking } { this.props.article.eenheid } {"\n"}
                        € { totalPrice.toFixed(2).toString().replace(".", ",") }
                    </Text>
                </Body>
                <Right style={{ flex: 1 }}>
                    <View style={{ marginRight: -15 }}>
                        <Button disabled={ this.state.added ? true : false }
                                style={ this.state.added ? style.checkedButtonStyle : style.buttonStyle }
                                onPress={ () => this.addArticle() }>
                                {
                                    this.state.isLoading ? 
                                    <Spinner color={ style.white } size={28} style={{ paddingHorizontal: 14 }} /> :
                                    <Icon name={ this.state.added ? "checkmark" : "add"} type="Ionicons" style={ style.buttonTextStyle } />
                                }
                        </Button>                    
                    </View>
                </Right>
            </CardItem>
        )
    }
}