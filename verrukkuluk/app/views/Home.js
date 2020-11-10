import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { Container, Spinner, Text, View } from 'native-base';
import * as style from '../resources/styles/styles.js';
import * as constants from '../config/constants';
import Head from '../components/Head';
import Foot from '../components/Foot';
import DishCard from '../components/DishCard';
import API from '../api/API';
import { FlatList } from 'react-native';


export default class Home extends Component
{
    state = {
        isLoaded: false,
        dishes: [],
        title: "verukkuluk!nl"
    }

    
    componentDidMount() {
        this.loadData();
    }


    onRefresh() {
        this.setState({ refreshing: true }, () => {
            this.loadData();
        })
    }


    loadData() {
        API.fetchData({ url: constants.allDishesUrl, table: "gerecht", userInUrl: true })
        .then( dishes => {
            this.setState({
                isLoaded: true,
                dishes: dishes,
                refreshing: false
            })
        })
        .catch( err => {
            console.warn(err);
            this.setState({
                isLoaded: true,
                title: "fout bij ophalen gegevens",
                refreshing: false
            })
        })
    }

    
    renderContent() {
        if (this.state.isLoaded && Array.isArray(this.state.dishes)) {

            const dishes = this.state.dishes.filter( dish => dish.complete );
            return(
                <FlatList data={ dishes }
                        keyExtractor={ dish => dish.id.toString() }
                        renderItem={ ({item}) => 
                            <DishCard key={ item.id } dish={ item } />
                        }
                        contentContainerStyle={{ padding: 10 }}
                        refreshControl={
                            <RefreshControl refreshing={ this.state.refreshing } onRefresh={ () => this.onRefresh() } colors={[style.darkRed, style.gold]} />
                        }
                />
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
                <View style={ this.state.isLoaded ? { flex: 1 } : { padding: 10, flex: 1, justifyContent: "center" }}>
                    { this.renderContent() }
                </View>
                <Foot />
            </Container>
        )
    }
}