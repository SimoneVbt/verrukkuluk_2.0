import React, { Component } from 'react';
import { Container, Content, Spinner, View, Text } from 'native-base';
import * as Style from '../resources/styles/styles.js';
import { baseUrl } from '../config/constants';
import Head from '../components/Head';
import Foot from '../components/Foot';
import DishCard from '../components/DishCard';
import API from '../api/API';


export default class Home extends Component
{
    state = {
        isLoaded: false,
        data: [],
        title: "verukkuluk!nl"
    }


    componentDidMount() {
        let user = API.fetchFromDatabase("gebruiker");
        let user_id = user[0].id;
        let url = baseUrl + "gerecht/get/" + user_id;

        API.fetchData(url, "gerecht")
            .then( data => {
                this.setState({
                    isLoaded: true,
                    data: data
                })
            })
            .catch( err => {
                this.setState({
                    isLoaded: true,
                    title: "fout bij ophalen gegevens"
                })
            })
    }

    
    _renderContent() {
        if (this.state.isLoaded && Array.isArray(this.state.data)) {
            return(
                <View style={{ paddingBottom: 18 }}>
                    {
                        this.state.data.map( dish => {
                            return( <DishCard key={ dish.id } dish={ dish } /> );
                        })
                    }
                </View>
            );
        } else if (this.state.isLoaded) {
            return( <View><Text style={{ color: Style.white, padding: 10 }}>Er is iets mis gegaan. Start de app opnieuw op.</Text></View> )
        }
        return( <View><Spinner color={ Style.gold } /></View> )
    }

    
    render() {
        return(
            <Container style={{ backgroundColor: Style.darkRed }}>
                <Head title={ this.state.title } home />
                <Content style={{ padding: 10 }}>
                    { this._renderContent() }
                </Content>
                <Foot home />
            </Container>
        )
    }
}