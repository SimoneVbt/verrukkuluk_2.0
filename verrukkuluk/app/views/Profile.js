import React, { Component, Fragment } from 'react';
import { Alert } from 'react-native';
import { Container, Content, View, Text, Card, CardItem, Thumbnail, Grid, Col, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as Style from '../resources/styles/styles';
import Head from '../components/Head';
import Foot from '../components/Foot';
import API from '../api/API';

const subtitleStyle = {
    color: Style.darkRed,
    fontWeight: "bold",
    paddingTop: 10,
    fontSize: 18    
}

const loginButtonStyle = {
    backgroundColor: Style.beige,
    color: Style.darkRed,
    borderColor: Style.darkRed,
    borderWidth: 2,
    height: 60,
    width: "50%",
    justifyContent: "center",
    marginTop: 10
}

const size = 100;


export default class Profile extends Component
{
    state = {
        user: {}
    }

    componentDidMount() {
        let user = API.fetchFromDatabase("gebruiker", 1);
        if (user) {
            this.setState({ user: user })
        }
    }
    

    _handleLogout() {
        if (API.clearDatabase()) {
            Actions.Login()
        }   
    }


    logout() {
        Alert.alert(
            'Uitloggen',
            'Weet je zeker dat je wil uitloggen?',
            [
                {
                    text: 'ja',
                    onPress: () => this._handleLogout()
                },
                {
                    text: 'nee',
                    style: 'cancel'
                }
            ]
        )
    }


    renderProfile() {
        if (this.state.user) {
            return(
                <Fragment>
                    <CardItem style={ Style.cardItemStyle }>
                        <Text>
                            Hey { this.state.user.gebruikersnaam }!
                        </Text>
                    </CardItem>                            
                    <CardItem style={ Style.cardItemStyle }>
                        <Grid style={{ paddingVertical: 20 }}>
                            <Col size={2}>
                                <Thumbnail source={{ uri: this.state.user.foto }}
                                            style={{ marginTop: 10, width: size, height: size, borderRadius: size / 2 }} />
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
                    <CardItem style={ Style.cardItemStyle }>
                        <View style={{ width: "100%" }}>
                            <Button style={ Style.buttonStyle }
                                    onPress={ () => Actions.EditProfile( )}>
                                <Text style={ Style.buttonTextStyle }>
                                    Bewerk profiel
                                </Text>
                            </Button>
                            <Button style={ Style.buttonStyle }>
                                <Text style={ Style.buttonTextStyle }>
                                    Wachtwoord veranderen
                                </Text>
                            </Button>
                            <Button style={{ margin: 5, borderRadius: 10, backgroundColor: "#000" }}
                                    onPress={ () => this.logout() }>
                                <Text style={ Style.buttonTextStyle }>
                                    Uitloggen
                                </Text>
                            </Button>
                        </View>
                    </CardItem>
                </Fragment>
            )
        } else {
            return(
                <Fragment>
                    <CardItem style={ Style.cardItemStyle }>
                        <Text>
                            Er is iets misgegaan.
                            
                        </Text>
                    </CardItem>
                    <CardItem style={ Style.cardItemStyle }>
                        <Button  rounded 
                                onPress={ () => Actions.Login() }
                                style={ loginButtonStyle }>
                            <Text style={{ color: Style.darkRed }}>Login</Text>
                        </Button>                    
                    </CardItem>
                </Fragment>
            )
        }
    }


    render() {
        return(
            <Container style={{ backgroundColor: Style.darkRed }}>
                <Head title="mijn profiel" />
                <Content style={{ padding: 10 }}>
                    <View style={{ paddingBottom: 18}}>
                        <Card style={ Style.cardStyle }>
                            <CardItem style={ Style.cardItemStyle }>
                                <Text style={ Style.titleStyle }>
                                    mijn profiel
                                </Text>
                            </CardItem>
                            { this.renderProfile() }
                        </Card>
                    </View>
                </Content>
                <Foot />
            </Container>
        )
    }
}