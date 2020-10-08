import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Container, Text, View, Spinner, Card, CardItem, Left, Right } from 'native-base';
import * as style from '../resources/styles/styles';
import * as constants from '../config/constants';
import Head from '../components/Head';
import Foot from '../components/Foot';
import API from '../api/API';
import Article from '../components/Article';


export default class ShoppingList extends Component
{
    state = {
        items: [],
        isLoaded: false,
        error: false
    }


    componentDidMount() {
        this.loadData();
    }


    loadData = () => {
        API.fetchData({ url: constants.listUrl, table: "boodschappen", userInUrl: true })
            .then( result => this.setState({
                items: result,
                isLoaded: true,
            }))
            .catch( error => this.setState({
                isLoaded: true,
                error: true
            }))        
    }


    renderPrice() {
        let totalPrice = 0;
        this.state.items.forEach(item => {
            totalPrice += item.totale_prijs
        });

        return(
            <Text style={{ fontStyle: "italic" }}>
                € { totalPrice.toFixed(2).toString().replace(".", ",") }
            </Text>
        )
    }


    //probleem: lijst aan onderkant scherm onklikbaar
    renderContent() {
        if (this.state.isLoaded && this.state.items.length > 0 && Array.isArray(this.state.items)) {
            return(
                <View style={{ width: "100%" }}>
                
                    <FlatList data={ this.state.items }
                                keyExtractor={ item => item.id.toString() }
                                contentContainerStyle={{ marginBottom: 10 }}
                                renderItem={ ({item}) =>
                                    <Article item={ item } loadData={ this.loadData } /> } />
                </View>
            )
        } else if (this.state.isLoaded && this.state.items.length == 0) {
            return(
                <Text style={{ fontStyle: "italic", marginBottom: 20 }}>
                    Geen boodschappen om weer te geven. Voeg artikelen toe via de detailpagina's van de gerechten.
                </Text>
            )
        } else if (this.state.error) {
            return(
                <Text style={{ marginBottom: 20 }}>
                    Er is iets mis gegaan. Probeer later opnieuw.
                </Text>
            )
        }
        return(
            <View style={{ flexDirection: "row", justifyContent: "center", width: "100%" }}>
                <Spinner color={ style.darkRed } size={50} style={{ marginVertical: 10 }} />
            </View>
        )
    }


    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="mijn lijstje" />
                <View style={{ backgroundColor: style.darkRed, padding: 10, flex: 1, marginBottom: 140 }}>
                    <Card style={ style.backgroundCardStyle }>
                        <CardItem style={ style.cardItemStyle }>
                            <Text style={ style.titleStyle }>
                                mijn boodschappenlijstje
                            </Text>
                        </CardItem>
                        <CardItem style={ style.cardItemStyle }>
                            { this.renderContent() }
                        </CardItem>
                        <View style={{ borderBottomColor: "#333", borderBottomWidth: 0.5 }} />
                        <CardItem style={ style.cardItemStyle }>
                            <Left style={{ justifyContent: "flex-end", flex: 3, marginBottom: 10 }}>
                                <Text style={{ fontStyle: "italic" }}>
                                    Totale prijs:
                                </Text>                                
                            </Left>
                            <Right style={{ justifyContent: "flex-end", flex: 1, marginBottom: 10 }}>
                                { this.renderPrice() }
                            </Right>
                        </CardItem>
                    </Card>
                </View>
                <Foot />
            </Container>
        )
    }
}