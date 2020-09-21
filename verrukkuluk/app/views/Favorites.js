import React, { Component } from 'react';
import { Container, Content, Text, View, Card, CardItem, Spinner } from 'native-base';
import * as Style from '../resources/styles/styles';
import Head from '../components/Head';
import Foot from '../components/Foot';
import API from '../api/API';
import DishCardItem from '../components/DishCardItem';

export default class Favorites extends Component
{
    state = {
        isLoaded: false,
        favorites: [],
        error: false
    }


    _loadData = () => new Promise ( (resolve, reject) => {
        resolve(API.fetchFromDatabase("gerecht", "favoriet == true"));
    })


    componentDidMount() {

        this._loadData()
            .then( favos => {
                this.setState({
                    favorites: favos,
                    isLoaded: true
                })
            })
            .catch( error => {
                this.setState({
                    error: true,
                    isLoaded: true
                })                
            });
    }


    _renderContent() {
        if (this.state.isLoaded && this.state.favorites.length > 0 && Array.isArray(this.state.favorites)) {
            return(
                <View style={{ paddingBottom: 18 }}>
                    {
                        this.state.favorites.map( dish => {
                            return( <DishCardItem key={ dish.id } dish={ dish } /> )
                        })
                    }
                </View>
            )
        } else if (this.state.isLoaded && this.state.favorites.length == 0) {
            return(
                <View style={{ color: Style.white, padding: 15, backgroundColor: Style.beige, marginTop: 5 }}>
                    <Text style={{ fontStyle: "italic" }}>
                        Geen favorieten om weer te geven. Voeg favorieten toe via de detailpagina's van de gerechten.
                    </Text>
                </View>
            )
        } else if (this.state.isLoaded) {
            return( <View><Text style={{ color: Style.white, padding: 10 }}>Er is iets mis gegaan. Start de app opnieuw op.</Text></View> )
        }
        return( <Spinner color={ Style.beige } /> )
    }


    render() {
        return(
            <Container style={{ backgroundColor: Style.darkRed }}>
                <Head title="mijn favorieten" />
                <Content style={{ padding: 10 }}>
                    <Card style={ Style.cardStyle }>
                        <CardItem style={ Style.cardItemStyle }>
                            <Text style={ Style.titleStyle }>
                                mijn favorieten
                            </Text>
                        </CardItem>
                        { this._renderContent() }
                    </Card>
                    { this.state.error && <Text style={ Style.messageStyle }>Er is iets mis gegaan</Text> }
                </Content>
               <Foot />
            </Container>
        )
    }
}