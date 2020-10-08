import React, { Component } from 'react';
import { Alert } from 'react-native';
import { View, Text, Left, Body, Right, CardItem, Thumbnail, Button, Icon, Spinner } from 'native-base';
import * as style from '../resources/styles/styles';
import ArticleMenu from './ArticleMenu';
import * as constants from '../config/constants';
import API from '../api/API';


export default class Article extends Component
{
    state = {
        isLoading: false,
        error: false,
        articleMenuVisible: false
    }

    
    _handleDelete() {
        this.setState({ isLoading: true });

        API.postData({ url: constants.deleteListUrl,
                        type: "delete",
                        table: "boodschappen",
                        id: this.props.item.id
        }).then( result => {
            this.props.loadData();
            this.setState({ isLoading: false });
        }).catch( error => {
            console.warn(error);
            this.setState({
                isLoading: false,
                error: true
            });
        })
    }


    deleteArticle() {
        Alert.alert(
            'Artikel verwijderen',
            `Weet je zeker dat je \'${ this.props.item.product }\' uit je lijst wil verwijderen?`,
            [
                {
                    text: 'ja',
                    onPress: () => this._handleDelete()
                },
                {
                    text: 'nee',
                    style: 'cancel'
                }
            ]
        )
    }


    setArticleMenuVisible = (bool) => {
        this.setState({ articleMenuVisible: bool })
    }


    renderModal(articleMenuVisible) {
        return(
            <ArticleMenu item={ this.props.item }
                        loadData={ this.props.loadData }
                        articleMenuVisible={ articleMenuVisible }
                        setArticleMenuVisible={ this.setArticleMenuVisible } />
        )
    }


    renderRight() {
        if (this.props.add) {
            return(
                <View style={{ marginRight: -15 }}>
                    <Button style={ style.buttonStyle }>
                        <Icon name="add" type="Ionicons" style={ style.buttonTextStyle } />
                    </Button>                    
                </View>
            )
        }
        return(
            <View style={{ flexDirection: "row", marginRight: -15 }}>
                <View style={{ flexDirection: "column" }}>
                    <Button bordered
                            style={{ borderColor: style.darkRed }}
                            onPress={ () => this.setArticleMenuVisible(!articleMenuVisible) }>
                        <Text style={{ color: "#333" }}>
                            { this.props.item.aantal_verpakkingen }
                        </Text>
                    </Button>
                    <Text style={{ fontSize: 14 }}>
                        € { this.props.item.totale_prijs.toFixed(2).toString().replace(".", ",") }
                    </Text>
                </View>
                <Button style={{ alignSelf: "flex-start" }}
                        iconLeft transparent
                        onPress={ () => this.deleteArticle() }>
                    <Icon name="delete" type="AntDesign" style={{ color: style.darkRed, fontSize: 16 }} />
                </Button>
            </View>           
        )
    }


    render() {
        const { articleMenuVisible } = this.state;
        return(
            <CardItem style={ style.cardItemStyle }>
                { this.renderModal(articleMenuVisible) }
                <Left style={ this.props.add ? { flex: 1, marginLeft: -15 } : { flex: 1 }}>
                    <Thumbnail source={{ uri: this.props.item.afbeelding }} />
                </Left>
                <Body style={ this.props.add ? { flex: 2, marginHorizontal: 5 } : { flex: 2 }}>
                    {
                        this.state.error &&
                        <Text style={{ color: style.darkRed, fontSize: 12, fontStyle: "italic" }}>
                            Er is iets fout gegaan.
                        </Text>
                    }
                    <Text>
                        { this.props.item.product }
                    </Text>
                    <Text style={{ fontSize: 14, fontStyle: "italic" }}>
                        { this.props.item.verpakking } { this.props.item.eenheid }
                    </Text>
                </Body>
                <Right style={{ flex: 1 }}>
                    { this.renderRight() }
                </Right>
                {
                    this.state.isLoading &&
                    <View style={ style.overlay }>
                        <Spinner color={ style.darkRed } />
                    </View>
                }
            </CardItem>
        )
    }
}