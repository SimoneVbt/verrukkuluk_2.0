import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Container, Button, Text, Form, Item, Label, Input, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as Style from '../resources/styles/styles';
import * as Constants from '../config/constants';
import Head from '../components/Head';
import API from '../api/API';


export default class Login extends Component
{
    state = {
        login: "",
        wachtwoord: "",
        isLoading: false,
        failure: false,
        error: false
    }


    login() {

        this.setState({
            isLoading: true
        });
        let data = {
            login: this.state.login,
            wachtwoord: this.state.wachtwoord
        }
        
        API.postData(Constants.loginUrl, data)
            .then( result => {

                if (result.id > 0) {
                    const url = Constants.userUrl + result.id;
                    API.fetchData(url, "gebruiker")
                        .then( user => Actions.Home() )
                        .catch( err => console.warn(err) );

                } else {
                    this.setState({ isLoading: false, failure: true });
                }
            })
            .catch( err => this.setState({ isLoading: false, error: true }) )
    }


    handleLoginChange(text) {
        this.setState({
            login: text
        })
    }

    handlePasswordChange(text) {
        this.setState({
            wachtwoord: text
        })
    }


    render() {
        return(
            <Container style={{ backgroundColor: Style.darkRed }}>
                <Head title="inloggen" noSearch login />
                <ScrollView style={{ flex: 1, padding: 20, paddingRight: 30 }}>
                    { this.state.failure && <Text style={ Style.messageStyle }>Ongeldige inloggegevens</Text> }
                    { this.state.error && <Text style={ Style.messageStyle }>Er is iets mis gegaan</Text> }
                    <Form>
                        <Item stackedLabel style={ Style.itemStyle }>
                            <Label style={ Style.labelStyle }>Gebruikersnaam / Email</Label>
                            <Input value={ this.state.login }
                                    keyboardType="email-address"
                                    onChangeText={ (text) => this.handleLoginChange(text) }
                                    style={ Style.inputStyle } />
                        </Item>
                        <Item stackedLabel style={ Style.itemStyle }>
                            <Label style={ Style.labelStyle }>Wachtwoord</Label>
                            <Input value={ this.state.wachtwoord } 
                                    secureTextEntry
                                    onChangeText={ (text) => this.handlePasswordChange(text) }
                                    style={ Style.inputStyle } />
                        </Item>
                        <Button large onPress={ () => this.login() }
                                style={{ alignSelf: "center", marginTop: 20, backgroundColor: Style.white }} >
                            { 
                                this.state.isLoading ? 
                                    <Spinner color={ Style.darkRed } style={{ paddingLeft: 10 }} /> : null
                            }
                            <Text style={{ color: Style.darkRed, fontSize: 20 }}>
                                Inloggen!
                            </Text>
                        </Button>                            
                    </Form>
                    <Button bordered onPress={ () => Actions.Register() }
                            style={{ alignSelf: "center", marginTop: 20, borderColor: Style.white }} >
                        <Text style={{ color: Style.white, fontSize: 15 }}>
                            Registreren
                        </Text>
                    </Button>   
                </ScrollView>
            </Container>
        )
    }

}