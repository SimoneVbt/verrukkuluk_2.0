import React, { Component } from 'react';
import { Container, Content, Text, View, Card, CardItem, Spinner } from 'native-base';
import * as style from '../resources/styles/styles';
import * as constants from '../config/constants';
import Head from '../components/Head';
import Foot from '../components/Foot';
import API from '../api/API';
import Favorite from '../components/Favorite';

export default class Favorites extends Component
{
    state = {
        favorites: [],
        error: false
    }

    componentDidMount() {
        this.loadData();
    }

    
    loadData = () => {
        let data = API.fetchFromDatabase("gerecht", false, "favoriet == true");
        this.setState({
            favorites: data ? data : false,
            error: data ? false : true
        })
    }


    handleDelete = (dish_id, info_id) => {
        API.postData({ 
            url: constants.deleteInfoUrl,
            type: "delete",
            favo: true,
            id: info_id,
            gerecht_id: dish_id })
        .then(result => this.loadData() )
        .catch(error => console.warn(error));
    }


    renderContent() {
        if (this.state.favorites.length > 0 && Array.isArray(this.state.favorites)) {
            return(
                <View style={{ margin: 10 }}>
                    { this.state.favorites.map( dish => { 
                        return <Favorite key={ dish.id } dish={ dish } handleDelete={ this.handleDelete } />
                    }) }
                </View>
            )
        } else if (this.state.favorites.length == 0 && !this.state.error) {
            return(
                <CardItem style={ style.cardItemStyle }>
                    <Text style={{ fontStyle: "italic", marginBottom: 20 }}>
                        Geen favorieten om weer te geven. Voeg favorieten toe via de detailpagina's van de gerechten.
                    </Text>
                </CardItem>
            )
        } else if (this.state.error) {
            return(
                <CardItem style={ style.cardItemStyle }>
                    <Text style={{ marginBottom: 20 }}>
                        Er is iets mis gegaan. Probeer later opnieuw.
                    </Text>
                </CardItem>
            )
        }
        return( <Spinner color={ style.darkRed } size={50} style={{ marginVertical: 10 }} /> )
    }


    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="mijn favorieten" />
                <Content style={{ padding: 10 }}>
                    <Card style={ style.backgroundCardStyle }>
                        <CardItem style={ style.cardItemStyle }>
                            <Text style={ style.titleStyle }>
                                mijn favorieten
                            </Text>
                        </CardItem>
                        { this.renderContent() }
                    </Card>
                </Content>
               <Foot />
            </Container>
        )
    }
}