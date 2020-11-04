import React, { Component } from 'react';
import { Container, Content, Text, View, Card, CardItem, Form, Input, Item, Label, Button, Icon, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as style from '../resources/styles/styles';
import * as constants from '../config/constants';
import API from '../api/API.js';
import Head from '../components/Head';
import { Picker } from '@react-native-community/picker';


export default class Ingredients extends Component
{
    state = {
        isLoaded: false,
        error: false,
        articles: []
    }

    componentDidMount() {
        API.fetchData({
            url: constants.articlesUrl,
            table: "artikel",
            sort: "naam"
        })
        .then( result => 
            this.setState({
                isLoaded: true,
                articles: result
            }))
        .catch( error => {
            console.warn(error);
            this.setState({
                isLoaded: true,
                error: true
            })
        })
    }


    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="ingrediënten toevoegen" />
                <Content style={{ padding: 10 }}>
                    <Card style={ style.cardStyle }>
                        <CardItem style={ style.cardItemStyle }>
                            <Text style={ style.titleStyle }>
                                ingrediënten toevoegen
                            </Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}