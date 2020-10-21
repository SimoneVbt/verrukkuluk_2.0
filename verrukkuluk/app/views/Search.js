import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Container, View, Text, Card, CardItem, Input, Item, Icon } from 'native-base';
import * as style from '../resources/styles/styles';
import Head from '../components/Head';
import Foot from '../components/Foot';
import API from '../api/API';
import DishCard from '../components/DishCard';


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


    checkResults(dish, searchWords) {
        const title = dish.titel.toLowerCase();
        const kitchen = dish.titel.toLowerCase();
        const type = dish.type.toLowerCase();
        const shortDes = dish.korte_omschrijving.toLowerCase();
        const longDes = dish.lange_omschrijving.toLowerCase();

        const criteria = [ title, kitchen, type, shortDes, longDes ];
        return searchWords.some( word => {

            for (let i = 0; i < criteria.length; i++) {
                if (criteria[i].indexOf(word.toLowerCase()) != -1) {
                    return true;
                }
            }

        });
    }


    renderResults() {
        if (this.state.search.length > 0) {

            const searchWords = this.state.search.split(' ');
            let results = this.state.dishes.filter( dish => this.checkResults(dish, searchWords));

            if (results.length > 0) {
                return(
                    <FlatList data={ results }
                            keyExtractor={ (result, index) => index.toString() }
                            renderItem={ ({item}) => <DishCard dish={ item } /> }
                            style={{ marginTop: 5 }}
                    />            
                )
            }        
        }
        

    }


    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="zoeken" />
                <View style={{ backgroundColor: style.darkRed, flex: 1, padding: 10 }}>
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