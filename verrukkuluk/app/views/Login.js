import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Container, Button, Text, Form, Item, Label, Input, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { darkRed, white } from '../resources/styles/styles';
import { baseUrl } from '../config/constants';
import Head from '../components/Head';
import API from '../api/API';

const itemStyle = {
    margin: 10
}
const labelStyle = {
    color: white,
    fontStyle: "italic"
}
const inputStyle = {
    color: white
}
const messageStyle = {
    backgroundColor: white,
    color: "#000",
    fontWeight: "bold",
    alignSelf: "center",
    paddingHorizontal: 30,
    paddingVertical: 10
}

export default class Login extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            wachtwoord: "",
            isLoading: false,
            failure: false,
            error: false
        }
    }


    _login() {

        this.setState({
            isLoading: true
        });
        let loginUrl = baseUrl + "gebruiker/login";
        let data = {
            login: this.state.login,
            wachtwoord: this.state.wachtwoord
        }
        
        API.postData(loginUrl, data)
            .then( result => {

                if (result.id > 0) {
                    let userUrl = baseUrl + `gebruiker/get/${ result.id }`;
                    console.warn(userUrl);
                    
                    API.fetchData(userUrl, "gebruiker")
                        .then( user => Actions.Home({ user: user }) )
                        .catch( err => console.warn(err) );

                } else {
                    this.setState({ isLoading: false, failure: true });
                }

            })
            .catch( err => this.setState({ isLoading: false, error: true }) )
    }


    _handleLoginChange(text) {
        this.setState({
            login: text
        })
    }

    _handlePasswordChange(text) {
        this.setState({
            wachtwoord: text
        })
    }


    render() {
        return(
            <Container style={{ backgroundColor: darkRed }}>
                <Head title="inloggen" login />
                <ScrollView style={{ flex: 1, padding: 20, paddingRight: 30 }}>
                    { this.state.failure && <Text style={ messageStyle }>Ongeldige inloggegevens</Text> }
                    { this.state.error !== false && <Text style={ messageStyle }>Er is iets mis gegaan</Text> }
                    <Form>
                        <Item stackedLabel style={ itemStyle }>
                            <Label style={ labelStyle }>Gebruikersnaam / Email</Label>
                            <Input value={ this.state.login }
                                    keyboardType="email-address"
                                    onChangeText={ (text) => this._handleLoginChange(text) }
                                    style={ inputStyle } />
                        </Item>
                        <Item stackedLabel style={ itemStyle }>
                            <Label style={ labelStyle }>Wachtwoord</Label>
                            <Input value={ this.state.wachtwoord } 
                                    secureTextEntry
                                    onChangeText={ (text) => this._handlePasswordChange(text) }
                                    style={ inputStyle } />
                        </Item>
                        <Button large  onPress={ () => this._login() }
                                style={{ alignSelf: "center", marginTop: 20, backgroundColor: white }} >
                            { 
                                this.state.isLoading ? 
                                    <Spinner color={ darkRed } style={{ paddingLeft: 10 }} /> : null
                            }
                            <Text style={{ color: darkRed, fontSize: 20 }}>
                                Inloggen!
                            </Text>
                        </Button>                            
                    </Form>
                    <Button bordered //onPress={ () => Actions.Register() } -- bestaat nog niet
                            style={{ alignSelf: "center", marginTop: 20, borderColor: white }} >
                        <Text style={{ color: white, fontSize: 15 }}>
                            Registreren
                        </Text>
                    </Button>   
                </ScrollView>
            </Container>
        )
    }

}