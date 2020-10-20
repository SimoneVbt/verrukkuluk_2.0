import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Container, View, Text, Card, CardItem, Input, Item, Icon } from 'native-base';
import * as style from '../resources/styles/styles';
import Head from '../components/Head';
import Foot from '../components/Foot';
import API from '../api/API';


export default class Search extends Component
{
    state = {
        search: "",
        dishes: [],
        results: []
    }


    componentDidMount() {
        const dishes = API.fetchFromDatabase("gerecht");
        this.setState({ dishes: dishes });
    }


    renderResult(item) {
        return(
            <Text>
                { item.titel }
            </Text>
        )
    }


    renderResults() {
        if (this.state.search.length > 0) {

            const searchWords = this.state.search.split(' ');
            let results = this.state.dishes.filter( dish => 
                dish.complete && ( //werkt niet op eerste woord!
                    searchWords.includes(dish.titel) || //losse woorden?
                    searchWords.includes(dish.keuken) ||
                    searchWords.includes(dish.type) ||
                    searchWords.includes(dish.korte_omschrijving) ||
                    searchWords.includes(dish.lange_omschrijving)
                )
            )

            if (results.length > 0) {
                return(
                    <FlatList data={ results }
                            keyExtractor={ (result, index) => index.toString() }
                            renderItem={ ({item}) => this.renderResult(item) }
                    />            
                )
            }        
        }
        

    }


    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="zoeken" />
                <View style={{ backgroundColor: style.darkRed, flex: 1,
                                padding: 10, paddingBottom: 75 }}>
                    <Card style={ style.cardStyle }>
                        <CardItem style={ style.cardItemStyle }>
                            <Text style={ style.titleStyle }>
                                zoeken
                            </Text>
                        </CardItem>
                        <CardItem style={ style.cardItemStyle }>
                            <Item style={{ margin: 10, borderColor: style.darkRed }}>
                                <Icon active name="md-search" type="Ionicons" style={{ color: style.darkRed }} />
                                <Input value={ this.state.search }
                                        onChangeText={ (text) => this.setState({ search: text }) }
                                        />
                            </Item>
                        </CardItem>
                    </Card>
                    { this.renderResults() }
                </View>
                <Foot />
            </Container>
        )
    }
}