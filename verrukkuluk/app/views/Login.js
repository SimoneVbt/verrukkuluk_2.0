import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Container, Button, Text, Form, Item, Label, Input, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as style from '../resources/styles/styles';
import * as constants from '../config/constants';
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
        
        API.postData({ url: constants.loginUrl, data: data })
            .then( result => {

                if (result.id > 0) {
                    API.fetchData({ url: constants.userUrl, table: "gebruiker", id: result.id })
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
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="inloggen" noSearch login />
                <ScrollView style={{ flex: 1, padding: 20, paddingRight: 30 }}>
                    { this.state.failure && <Text style={ style.messageStyle }>Ongeldige inloggegevens</Text> }
                    { this.state.error && <Text style={ style.messageStyle }>Er is iets mis gegaan</Text> }
                    <Form>
                        <Item stackedLabel style={ style.itemStyle }>
                            <Label style={ style.labelStyle }>Gebruikersnaam / Email</Label>
                            <Input value={ this.state.login }
                                    keyboardType="email-address"
                                    onChangeText={ (text) => this.handleLoginChange(text) }
                                    style={ style.inputStyle } />
                        </Item>
                        <Item stackedLabel style={ style.itemStyle }>
                            <Label style={ style.labelStyle }>Wachtwoord</Label>
                            <Input value={ this.state.wachtwoord } 
                                    secureTextEntry
                                    onChangeText={ (text) => this.handlePasswordChange(text) }
                                    style={ style.inputStyle } />
                        </Item>
                        <Button large onPress={ () => this.login() }
                                style={{ alignSelf: "center", marginTop: 20, backgroundColor: style.white }} >
                            { 
                                this.state.isLoading ? 
                                    <Spinner color={ style.darkRed } style={{ paddingLeft: 10 }} /> : null
                            }
                            <Text style={{ color: style.darkRed, fontSize: 20 }}>
                                Inloggen!
                            </Text>
                        </Button>                            
                    </Form>
                    <Button bordered onPress={ () => Actions.Register() }
                            style={{ alignSelf: "center", marginTop: 20, borderColor: style.white }} >
                        <Text style={{ color: style.white, fontSize: 15 }}>
                            Registreren
                        </Text>
                    </Button>   
                </ScrollView>
            </Container>
        )
    }

}