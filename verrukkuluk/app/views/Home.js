import React, { Component } from 'react';
import { Container, Content, Spinner, View, Text } from 'native-base';
import * as Style from '../resources/styles/styles.js';
import * as Constants from '../config/constants';
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
        const user = API.fetchFromDatabase("gebruiker");
        const user_id = user[0].id;
        const url = Constants.allDishesUrl + user_id;

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

    
    renderContent() {
        if (this.state.isLoaded && Array.isArray(this.state.data)) {
            return(
                <View>
                    {
                        this.state.data.map( dish => {
                            return( <DishCard key={ dish.id } dish={ dish } /> );
                        })
                    }
                </View>
            );
        } else if (this.state.isLoaded) {
            return( <Text style={{ color: Style.white, padding: 10 }}>Er is iets mis gegaan. Start de app opnieuw op.</Text> )
        }
        return( <Spinner color={ Style.gold } size={60} /> )
    }

    
    render() {
        return(
            <Container style={{ backgroundColor: Style.darkRed }}>
                <Head title={ this.state.title } home />
                <Content contentContainerStyle= { this.state.isLoaded ? { padding: 10 } : { padding: 10, flex: 1, justifyContent: "center" } }>
                    { this.renderContent() }
                </Content>
                <Foot home />
            </Container>
        )
    }
}