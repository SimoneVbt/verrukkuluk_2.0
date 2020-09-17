import React, { Component, Fragment } from 'react';
import { Alert } from 'react-native';
import { Container, Content, View, Text, Card, CardItem, Thumbnail, Grid, Col, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { darkRed, cardStyle, cardItemStyle, titleStyle, buttonStyle, buttonTextStyle } from '../resources/styles/styles';
import Head from '../components/Head';
import Foot from '../components/Foot';
import API from '../api/API';

const subtitleStyle = {
    color: darkRed,
    fontWeight: "bold",
    paddingTop: 10,
    fontSize: 18    
}


export default class Profile extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        let user = API.fetchFromDatabase("gebruiker");
        if (user) {
            this.setState({
                user: user[0]
            })
        }
    }

    _logout() {
        Alert.alert(
            'Uitloggen',
            'Weet je zeker dat je wil uitloggen?',
            [
                {
                    text: 'ja',
                    onPress: () => API.clearDatabase()
                                    .then( data => Actions.Login() )
                },
                {
                    text: 'nee',
                    style: 'cancel'
                }
            ]
        )
    }


    _renderProfile() {
        console.warn(this.state.user.foto)
        if (this.state.user) {
            return(
                <Fragment>
                    <CardItem style={ cardItemStyle }>
                        <Text>
                            Hey { this.state.user.gebruikersnaam }!
                        </Text>
                    </CardItem>                            
                    <CardItem style={ cardItemStyle }>
                        <Grid style={{ paddingVertical: 20 }}>
                            <Col size={2}>
                                <Thumbnail source={{ uri: this.state.user.foto }} />
                            </Col>
                            <Col size={3}>
                                <Text style={ subtitleStyle }>
                                    Gebruikersnaam
                                </Text>
                                <Text>
                                    { this.state.user.gebruikersnaam }
                                </Text>
                                <Text style={ subtitleStyle }>
                                    Email
                                </Text>
                                <Text>
                                    { this.state.user.email }
                                </Text>
                            </Col>
                        </Grid>
                    </CardItem>
                    <CardItem style={ cardItemStyle }>
                        <View style={{ width: "100%" }}>
                            <Button style={ buttonStyle }>
                                <Text style={ buttonTextStyle }>
                                    Bewerk profiel
                                </Text>
                            </Button>
                            <Button style={ buttonStyle }>
                                <Text style={ buttonTextStyle }>
                                    Wachtwoord veranderen
                                </Text>
                            </Button>
                            <Button style={{ margin: 5, borderRadius: 10, backgroundColor: "#000" }}
                                onPress={ () => this._logout() }>
                                <Text style={ buttonTextStyle }>
                                    Uitloggen
                                </Text>
                            </Button>
                        </View>
                    </CardItem>
                </Fragment>
            )
        } else {
            return(
                <CardItem style={ cardItemStyle }>
                    <Text>
                        Er is iets misgegaan. Probeer het later opnieuw.
                    </Text>
                </CardItem>
            )
        }
    }


    render() {
        return(
            <Container style={{ backgroundColor: darkRed }}>
                <Head title="mijn profiel" />
                <Content style={{ padding: 10 }}>
                    <View style={{ paddingBottom: 18}}>
                        <Card style={ cardStyle }>
                            <CardItem style={ cardItemStyle }>
                                <Text style={ titleStyle }>
                                    mijn profiel
                                </Text>
                            </CardItem>
                            { this._renderProfile() }
                        </Card>
                    </View>
                </Content>
                <Foot />
            </Container>
        )
    }
}