import React, { Component } from 'react';
import { Container, Content, Text, View, Card, CardItem, Spinner } from 'native-base';
import * as Style from '../resources/styles/styles';
import { baseUrl } from '../config/constants';
import Head from '../components/Head';
import Foot from '../components/Foot';
import API from '../api/API';
import DishCard from '../components/DishCard';

export default class Favorites extends Component
{
    state = {
        isLoaded: false,
        favorites: [],
        error: false
        
    }


    //niet geïnteresseerd in de gerechtinfo, maar in de gerechten: backend aanpassen
    componentDidMount() {
        let user = API.fetchFromDatabase("gebruiker");
        let id = user[0].id;
        let url = baseUrl + "gerechtinfo/get/favorieten/user/" + id ;
        
        API.fetchData(url, "gerechtinfo", 'record_type = "F"')
            .then( data => 
                this.setState({
                    favorites: data,
                    isLoaded: true
                }))
            .catch( error => 
                this.setState({
                    error: true,
                    isLoaded: true
                }));
        console.warn(this.state.favorites[0]);
    }


    _renderContent() {
        if (this.state.isLoaded) {
            return(
                <View style={{ paddingBottom: 18 }}>
                {
                    this.state.favorites.map( dish => {
                        return( <DishCard key={ dish.id } dish={ dish } /> );
                    })
                }
                </View>
            )
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
                    </Card>
                    { this.state.error && <Text style={ Style.messageStyle }>Er is iets mis gegaan</Text> }
                    {/* { this._renderContent() } */}
                </Content>
               <Foot />
            </Container>
        )
    }
}