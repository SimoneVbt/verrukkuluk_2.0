import React, { Component, Fragment } from 'react';
import { Alert } from 'react-native';
import { Container, Content, View, Text, Card, CardItem, Thumbnail, Grid, Col, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as style from '../resources/styles/styles';
import { defaultUser } from '../config/constants';
import Head from '../components/Head';
import Foot from '../components/Foot';
import API from '../api/API';

const subtitlestyle = {
    color: style.darkRed,
    fontWeight: "bold",
    paddingTop: 10,
    fontSize: 18    
}

const loginButtonstyle = {
    backgroundColor: style.beige,
    color: style.darkRed,
    borderColor: style.darkRed,
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
        const { afbeelding } = this.state;
        if (this.state.user) {
            return(
                <Fragment>
                    <CardItem style={ style.cardItemstyle }>
                        <Text>
                            Hey { this.state.user.gebruikersnaam }!
                        </Text>
                    </CardItem>                            
                    <CardItem style={ style.cardItemstyle }>
                        <Grid style={{ paddingVertical: 20 }}>
                            <Col size={2}>
                                <Thumbnail source={{ uri: afbeelding ? afbeelding : defaultUser }}
                                            style={{ marginTop: 10, width: size, height: size, borderRadius: size / 2 }} />
                            </Col>
                            <Col size={3}>
                                <Text style={ subtitlestyle }>
                                    Gebruikersnaam
                                </Text>
                                <Text>
                                    { this.state.user.gebruikersnaam }
                                </Text>
                                <Text style={ subtitlestyle }>
                                    Email
                                </Text>
                                <Text>
                                    { this.state.user.email }
                                </Text>
                            </Col>
                        </Grid>
                    </CardItem>
                    <CardItem style={ style.cardItemstyle }>
                        <View style={{ width: "100%" }}>
                            <Button style={ style.buttonstyle }
                                    onPress={ () => Actions.EditProfile( )}>
                                <Text style={ style.buttonTextstyle }>
                                    Bewerk profiel
                                </Text>
                            </Button>
                            <Button style={ style.buttonstyle }>
                                <Text style={ style.buttonTextstyle }>
                                    Wachtwoord veranderen
                                </Text>
                            </Button>
                            <Button style={{ margin: 5, borderRadius: 10, backgroundColor: "#000" }}
                                    onPress={ () => this.logout() }>
                                <Text style={ style.buttonTextstyle }>
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
                    <CardItem style={ style.cardItemstyle }>
                        <Text>
                            Er is iets misgegaan.
                            
                        </Text>
                    </CardItem>
                    <CardItem style={ style.cardItemstyle }>
                        <Button  rounded 
                                onPress={ () => Actions.Login() }
                                style={ loginButtonstyle }>
                            <Text style={{ color: style.darkRed }}>Login</Text>
                        </Button>                    
                    </CardItem>
                </Fragment>
            )
        }
    }


    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="mijn profiel" />
                <Content style={{ padding: 10 }}>
                    <View style={{ paddingBottom: 18}}>
                        <Card style={ style.cardstyle }>
                            <CardItem style={ style.cardItemstyle }>
                                <Text style={ style.titlestyle }>
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