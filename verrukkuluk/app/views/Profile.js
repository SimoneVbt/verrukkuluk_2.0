import React, { Component, Fragment } from 'react';
import { Alert } from 'react-native';
import { Container, Content, View, Text, Card, CardItem, Thumbnail, Grid, Col, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as style from '../resources/styles/styles';
import { defaultUser } from '../config/constants';
import Head from '../components/Head';
import Foot from '../components/Foot';
import API from '../api/API';
import PasswordMenu from '../components/PasswordMenu';

const subtitlestyle = {
    color: style.darkRed,
    fontWeight: "bold",
    paddingTop: 10,
    fontSize: 18    
}

const loginButtonStyle = {
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
        user: {},
        passwordMenuVisible: false
    }

    componentDidMount() {
        let user = API.fetchUser();
        this.setState({ user: user ? user : {} });
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
        const { afbeelding } = this.state.user;
        if (this.state.user) {
            return(
                <Fragment>
                    <CardItem style={ style.cardItemStyle }>
                        <Text>
                            Hey { this.state.user.gebruikersnaam }!
                        </Text>
                    </CardItem>                            
                    <CardItem style={ style.cardItemStyle }>
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
                    <CardItem style={ style.cardItemStyle }>
                        <View style={{ width: "100%" }}>
                            <Button style={ style.buttonStyle }
                                    onPress={ () => Actions.EditProfile() }>
                                <Text style={ style.buttonTextStyle }>
                                    Bewerk profiel
                                </Text>
                            </Button>
                            <Button style={ style.buttonStyle }
                                    onPress={ () => this.setPasswordMenuVisible(true) }>
                                <Text style={ style.buttonTextStyle }>
                                    Wachtwoord veranderen
                                </Text>
                            </Button>
                            <Button style={{ margin: 5, borderRadius: 10, backgroundColor: "#000" }}
                                    onPress={ () => this.logout() }>
                                <Text style={ style.buttonTextStyle }>
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
                    <CardItem style={ style.cardItemStyle }>
                        <Text>
                            Er is iets misgegaan.
                            
                        </Text>
                    </CardItem>
                    <CardItem style={ style.cardItemStyle }>
                        <Button  rounded 
                                onPress={ () => Actions.Login() }
                                style={ loginButtonStyle }>
                            <Text style={{ color: style.darkRed }}>Login</Text>
                        </Button>                    
                    </CardItem>
                </Fragment>
            )
        }
    }


    setPasswordMenuVisible = (bool) => {
        this.setState({ passwordMenuVisible: bool })
    }


    renderPasswordMenu(passwordMenuVisible) {
        return(
            <PasswordMenu passwordMenuVisible={ passwordMenuVisible }
                            setPasswordMenuVisible={ this.setPasswordMenuVisible }
                            user={ this.state.user }
            />
        )
    }


    render() {
        const { passwordMenuVisible } = this.state;
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="mijn profiel" />
                <Content style={{ padding: 10 }}>
                    { this.renderPasswordMenu(passwordMenuVisible) }
                    <View style={{ paddingBottom: 18}}>
                        <Card style={ style.cardStyle }>
                            <CardItem style={ style.cardItemStyle }>
                                <Text style={ style.titleStyle }>
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