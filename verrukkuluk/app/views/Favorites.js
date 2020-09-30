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
        isLoaded: false,
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
            isLoaded: true,
            error: data ? false : true
        })
    }


    handleDelete = (dish_id) => {

        API.deleteData({ url: constants.deleteFavoUrl,
                        table: "gerecht",
                        user: true,
                        id: dish_id,
                        favo: true })
            .then(result => this.loadData() )
            .catch(error => console.warn(error));
    }


    renderContent() {
        if (this.state.isLoaded && this.state.favorites.length > 0 && Array.isArray(this.state.favorites)) {
            return(
                <View style={{ paddingBottom: 18, paddingTop: 5 }}>
                    {
                        this.state.favorites.map( dish => {

                            return( <Favorite key={ dish.id } dish={ dish } handleDelete={ this.handleDelete } /> )
                            
                        })
                    }
                </View>
            )
        } else if (this.state.isLoaded && this.state.favorites.length == 0) {
            return(
                <View style={{ padding: 15, marginTop: 5 }}>
                    <Text style={{ fontStyle: "italic" }}>
                        Geen favorieten om weer te geven. Voeg favorieten toe via de detailpagina's van de gerechten.
                    </Text>
                </View>
            )
        } else if (this.state.isLoaded) {
            return( <View style={{ padding: 15, marginTop: 5 }}><Text>Er is iets mis gegaan. Start de app opnieuw op.</Text></View> )
        }
        return( <Spinner color={ style.darkRed } style={{ marginTop: 5 }} /> )
    }


    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="mijn favorieten" />
                <Content style={{ padding: 10 }}>
                    <Card style={{ backgroundColor: style.beige, marginBottom: 20 }}>
                        <CardItem style={ style.cardItemStyle }>
                            <Text style={ style.titleStyle }>
                                mijn favorieten
                            </Text>
                        </CardItem>
                        { this.renderContent() }
                    </Card>
                    { this.state.error && <Text style={ style.messageStyle }>Er is iets mis gegaan</Text> }
                </Content>
               <Foot />
            </Container>
        )
    }
}