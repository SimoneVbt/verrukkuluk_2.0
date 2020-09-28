import React, { Component } from 'react';
import { Container, Content, Text, View, Card, CardItem, Spinner } from 'native-base';
import * as Style from '../resources/styles/styles';
import * as Constants from '../config/constants';
import Head from '../components/Head';
import Foot from '../components/Foot';
import API from '../api/API';
import Favorite from '../components/Favorite';

export default class Favorites extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            favorites: [],
            error: false
        }
        this.handleDelete.bind(this);
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


    handleDelete(dish_id) {
        let user = API.fetchFromDatabase("gebruiker");
        let user_id = user[0].id;
        let url = `${ Constants.baseUrl }/gerechtinfo/delete/${ user_id }/F/${ dish_id }`;

        API.deleteData(url, "gerecht", dish_id)
            .then(result => this.state.favorites.filter(favo => favo.id !== dish_id))
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
        return( <Spinner color={ Style.darkRed } style={{ marginTop: 5 }} /> )
    }


    render() {
        return(
            <Container style={{ backgroundColor: Style.darkRed }}>
                <Head title="mijn favorieten" />
                <Content style={{ padding: 10 }}>
                    <Card style={{ backgroundColor: Style.beige, marginBottom: 20 }}>
                        <CardItem style={ Style.cardItemStyle }>
                            <Text style={ Style.titleStyle }>
                                mijn favorieten
                            </Text>
                        </CardItem>
                        { this.renderContent() }
                    </Card>
                    { this.state.error && <Text style={ Style.messageStyle }>Er is iets mis gegaan</Text> }
                </Content>
               <Foot />
            </Container>
        )
    }
}