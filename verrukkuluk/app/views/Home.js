import React, { Component } from 'react';
import { Container, Content, Spinner, View, Text } from 'native-base';
import * as style from '../resources/styles/styles.js';
import * as constants from '../config/constants';
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


    //firet niet na login
    componentDidMount() {
        API.fetchData({ url: constants.allDishesUrl, table: "gerecht", userInUrl: true })
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
            return( <Text style={{ color: style.white, padding: 10 }}>Er is iets mis gegaan. Start de app opnieuw op.</Text> )
        }
        return( <Spinner color={ style.gold } size={60} style={{ paddingBottom: 50 }} /> )
    }

    
    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title={ this.state.title } home />
                <Content contentContainerStyle= { this.state.isLoaded ? { padding: 10 } : { padding: 10, flex: 1, justifyContent: "center" } }>
                    { this.renderContent() }
                </Content>
                <Foot home />
            </Container>
        )
    }
}