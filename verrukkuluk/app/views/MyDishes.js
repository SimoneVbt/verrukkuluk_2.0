import React, { Component } from 'react';
import { Container, Content, Button, Card, CardItem, Text, Fab, Icon, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as style from '../resources/styles/styles.js';
import Head from '../components/Head';
import Foot from '../components/Foot';
import API from '../api/API.js';
import DishCard from '../components/DishCard';


export default class MyDishes extends Component
{
    state = {
        dishes: [],
        error: false
    }


    componentDidMount() {
        let user = API.fetchFromDatabase("gebruiker", 1);
        let data = API.fetchFromDatabase("gerecht", false, `gebruiker_id == ${ user.remote_id }`);
        this.setState({
            dishes: data ? data : false,
            error: data ? false : true
        });
    }


    renderContent() {
        if (this.state.dishes.length > 0) {
            return(
                <View style={{ marginBottom: 0 }}>
                    {
                        this.state.dishes.map( dish => {
                            return( 
                                <DishCard key={ dish.id } dish={ dish } mydishes />
                            )
                        })                        
                    }
                </View>
            )
        } else if (this.state.dishes.length == 0 && !this.state.error) {
            return(
                <Card style={ style.cardStyle }>
                    <CardItem style={ style.cardItemStyle }>
                        <Text style={{ fontStyle: "italic" }}>
                            Je hebt nog geen gerechten gepost op verrukkuluk.nl. Voeg een gerecht toe via de knop hierboven.
                        </Text>                        
                    </CardItem>
                </Card>                
            )
        }
        return(
            <Card style={ style.cardStyle }>
                <CardItem style={ style.cardItemStyle }>
                    <Text>
                        Fout bij het laden van de gerechten.
                    </Text>                        
                </CardItem>
            </Card>
        )
    }
    

    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="mijn gerechten" />
                <Content style={{ padding: 10 }}>
                    <Card style={ style.cardStyle }>
                        <CardItem style={ style.cardItemStyle }>
                            <Text style={ style.titleStyle }>
                                mijn gerechten
                            </Text>
                        </CardItem>
                    </Card>
                    { this.renderContent() }
                </Content>
                <View>
                    <Fab onPress={ () => Actions.NewDish() }
                        style={{ backgroundColor: style.darkRed,
                                    borderWidth: 1,
                                    borderColor: style.beige }}>
                        <Icon name="add" type="Ionicons" style={{ color: style.beige }} />
                    </Fab>
                </View>
                <Foot />
            </Container>

        )
    }
}