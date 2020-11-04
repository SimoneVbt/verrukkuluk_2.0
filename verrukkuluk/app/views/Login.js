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

        this.setState({ isLoading: true }, () => {

            API.postData({
                url: constants.loginUrl,
                type: "post",
                table: "gebruiker",
                data: { login: this.state.login, wachtwoord: this.state.wachtwoord }
            })
            .then( result => {

                if (result.hasOwnProperty('id')) {
                    Actions.Home()
                } else {
                    this.setState({
                        isLoading: false,
                        failure: true
                    });
                }
                
            })
            .catch( error => {
                console.warn(error);
                this.setState({
                    isLoading: false, 
                    error: true 
                })
            })
        });
    }
    

    handleChange(text, type) {
        this.setState({
            [type]: text
        })
    }


    renderForm() {
        return(
            <Form>
                <Item stackedLabel style={ style.itemStyle }>
                    <Label style={ style.labelStyleDark }>Gebruikersnaam / Email</Label>
                    <Input value={ this.state.login }
                            keyboardType="email-address"
                            onChangeText={ (text) => this.handleChange(text, "login") }
                            style={ style.inputStyleDark } />
                </Item>
                <Item stackedLabel style={ style.itemStyle }>
                    <Label style={ style.labelStyleDark }>Wachtwoord</Label>
                    <Input value={ this.state.wachtwoord } 
                            secureTextEntry
                            onChangeText={ (text) => this.handleChange(text, "wachtwoord") }
                            style={ style.inputStyleDark } />
                </Item>
                <Button large onPress={ () => this.login() }
                        style={{ alignSelf: "center", marginTop: 20, backgroundColor: style.white }} >
                    { 
                        this.state.isLoading &&
                            <Spinner color={ style.darkRed } style={{ paddingLeft: 10 }} />
                    }
                    <Text style={{ color: style.darkRed, fontSize: 20 }}>
                        Inloggen!
                    </Text>
                </Button>
            </Form>
        )
    }


    renderError() {
        let text = this.state.failure ? "Ongeldige inloggegevens" :
                    this.state.error ? "Er is iets misgegaan" :
                    "";

        if (text != "") {
            return(
                <Text style={ style.messageStyleDark }>
                    { text }
                </Text>
            )
        }
    }


    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="inloggen" noSearch login />
                <ScrollView style={{ flex: 1, padding: 20, paddingRight: 30 }}>
                    { this.renderError() }
                    { this.renderForm() }
                    <Button bordered 
                            onPress={ () => Actions.Register() }
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