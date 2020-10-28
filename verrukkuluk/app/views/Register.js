import React, { Component } from 'react';
import { Container, Form, Item, Label, Input, Spinner, Button, Text, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as style from '../resources/styles/styles';
import * as constants from '../config/constants';
import Head from '../components/Head';
import API from '../api/API';

export default class Register extends Component
{
    state = {
        gebruikersnaam: "",
        noUserName: false,
        email: "",
        noEmail: false,
        wachtwoord: "",
        noPassword: false,
        isLoading: false,
        error: false
    }

    submit() {
        if (this.state.gebruikersnaam.length === 0) {
            this.setState({ noUserName: true });
            return;
        }
        if (this.state.email.length === 0) {
            this.setState({ noUserName: false, noEmail : true });
            return;
        }
        if (this.state.wachtwoord.length === 0) {
            this.setState({ noUserName: false, noEmail: false, noPassword: true });
            return;
        }

        this.setState({ isLoading: true }, () => {
            const data = {
                gebruikersnaam: this.state.gebruikersnaam,
                email: this.state.email,
                wachtwoord: this.state.wachtwoord,
                roles: ["ROLE_USER"]
            }

            API.postData({
                url: constants.newUserUrl,
                table: "gebruiker",
                type: "post",
                data: data })
            .then( result => Actions.Home() )
            .catch( error => 
                this.setState({
                    isLoading: false,
                    error: true
                })
            )
        });

    }


    handleChange(text, type) {
        this.setState({
            [type]: text
        })
    }


    renderError() {
        let type = this.state.noUserName ? "gebruikersnaam" :
                    this.state.noEmail ? "email" :
                    this.state.noPassword ? "wachtwoord" : false;

        let message = type ? `Vul het volgende veld in: ${type}` :
                    this.state.error ? "Fout van de server bij het registreren" : false;

        if (message) {
            return(
                <Text style={ style.messageStyle }>
                    { message }
                </Text>
            )
        }
    }


    renderForm() {
        return(
            <Form>
                <Item stackedLabel style={ style.itemStyle }>
                    <Label style={ style.labelStyle }>Gebruikersnaam</Label>
                    <Input value={ this.state.gebruikersnaam }
                            maxLength={20}
                            onChangeText={ (text) => this.handleChange(text, "gebruikersnaam") }
                            style={ style.inputStyle } />
                </Item>
                <Text style={{ fontSize: 12, fontStyle: "italic", color: style.gold,
                               marginLeft: 15, marginTop: -5, marginBottom: 15 }}>
                    { this.state.gebruikersnaam.length } / 20 tekens
                </Text>
                <Item stackedLabel style={ style.itemStyle }>
                    <Label style={ style.labelStyle }>Email</Label>
                    <Input value={ this.state.email }
                            maxLength={50}
                            keyboardType="email-address"
                            onChangeText={ (text) => this.handleChange(text, "email") }
                            style={ style.inputStyle } />
                </Item>
                <Text style={{ fontSize: 12, fontStyle: "italic", color: style.gold,
                               marginLeft: 15, marginTop: -5, marginBottom: 15 }}>
                    { this.state.email.length } / 50 tekens
                </Text>
                <Item stackedLabel style={ style.itemStyle }>
                    <Label style={ style.labelStyle }>Wachtwoord</Label>
                    <Input value={ this.state.wachtwoord }
                            maxLength={50}
                            secureTextEntry
                            onChangeText={ (text) => this.handleChange(text, "wachtwoord") }
                            style={ style.inputStyle } />
                </Item>
                <Text style={{ fontSize: 12, fontStyle: "italic", color: style.gold,
                               marginLeft: 15, marginTop: -5, marginBottom: 15 }}>
                    { this.state.wachtwoord.length } / 50 tekens
                </Text>
                <Button large onPress={ () => this.submit() }
                        style={{ alignSelf: "center", marginTop: 20, backgroundColor: style.white }} >
                    <Text style={{ color: style.darkRed, fontSize: 20 }}>
                        Registreer
                    </Text>
                </Button>
            </Form>
        )
    }


    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="registreren" noSearch />
                    <View style={{ flex: 1, padding: 20, paddingRight: 30 }}>
                        { this.renderError() }
                        { this.renderForm() }
                    </View>
                    {
                        this.state.isLoading &&
                        <View style={ style.overlay }>
                            <Spinner color={ style.darkRed } size={60} style={{ marginTop: -100 }} />
                        </View>
                    }
            </Container>

        )
    }
}