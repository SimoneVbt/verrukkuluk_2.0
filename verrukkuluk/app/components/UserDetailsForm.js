import React, { Component } from 'react';
import { Form, Item, Label, Input, Spinner, Button, Text, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as style from '../resources/styles/styles';
import * as constants from '../config/constants';
import API from '../api/API';


export default class UserDetailsForm extends Component
{
    state = {
        user: {},
        gebruikersnaam: "",
        email: "",
        wachtwoord: "",
        isLoading: false,
        error: false,
        passwordError: false,
        emptyField: false
    }

    componentDidMount() {
        if (this.props.edit) {
            let user = API.fetchFromDatabase("gebruiker", 1);
            this.setState({
                user: user,
                gebruikersnaam: user.gebruikersnaam,
                email: user.email
            })
        }
    }

    submit() {
        if (this.state.gebruikersnaam.length === 0 || this.state.email.length === 0 || this.state.wachtwoord.length === 0) {
            this.setState({ emptyField: true });
            return;
        }
        if (this.props.edit && (this.state.wachtwoord != this.state.user.wachtwoord)) {
            this.setState({ passwordError: true });
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
                data: data
            })
            .then( result => {
                if (this.props.register) {
                    Actions.Home();
                } else {
                    Actions.pop({ refresh: {} });
                }
            }  )
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
        let message = this.state.emptyField ? "Vul a.u.b. alle velden in" :
                        this.state.passwordError ? "Incorrect wachtwoord" :
                        this.state.error ? "Fout van de server bij het versturen van het formulier" :
                        "";
        if (message) {
            return(
                <Text style={ style.messageStyleDark }>
                    { message }
                </Text>
            )
        }
    }


    renderButton() {
        if (this.props.register) {
            return(
                <Button large
                        onPress={ () => this.submit() }
                        style={{ alignSelf: "center", marginTop: 20, backgroundColor: style.white }} >
                    <Text style={{ color: style.darkRed, fontSize: 20 }}>
                        registreer
                    </Text>
                </Button>
            )
        }
        return(
            <View style={{ marginTop: 5, width: "95%", alignSelf: "center" }}>
                <Button full
                        onPress={ () => this.submit() }
                        style={ style.fullButtonStyle } >
                    { 
                        this.state.isLoading &&
                            <Spinner color={ style.white } style={{ marginLeft: -36 }} />
                    }
                    <Text style={ style.buttonTextStyle }>
                        { this.props.edit ? "bewerken" : "verzenden" }
                    </Text>
                </Button>                
            </View>

        )
    }


    render() {
        return(
            <Form>
                <Item stackedLabel style={ style.itemStyle }>
                    <Label style={ this.props.light ? style.labelStyle : style.labelStyleDark }>Gebruikersnaam</Label>
                    <Input value={ this.state.gebruikersnaam }
                            maxLength={20}
                            onChangeText={ (text) => this.handleChange(text, "gebruikersnaam") }
                            style={ style.inputStyle } />
                </Item>
                <Text style={ this.props.light ? style.countTextStyle :style.countTextStyleDark }>
                    { this.state.gebruikersnaam.length } / 20 tekens
                </Text>
                <Item stackedLabel style={ style.itemStyle }>
                    <Label style={ this.props.light ? style.labelStyle : style.labelStyleDark }>Email</Label>
                    <Input value={ this.state.email }
                            maxLength={50}
                            keyboardType="email-address"
                            onChangeText={ (text) => this.handleChange(text, "email") }
                            style={ style.inputStyle } />
                </Item>
                <Text style={ this.props.light ? style.countTextStyle :style.countTextStyleDark }>
                    { this.state.email.length } / 50 tekens
                </Text>
                <Item stackedLabel style={ style.itemStyle }>
                    <Label style={ this.props.light ? style.labelStyle : style.labelStyleDark }>
                        { this.props.light ? "Wachtwoord (ter bevestiging)" : "Wachtwoord" }
                    </Label>
                    <Input value={ this.state.wachtwoord }
                            maxLength={50}
                            secureTextEntry
                            onChangeText={ (text) => this.handleChange(text, "wachtwoord") }
                            style={ style.inputStyle } />
                </Item>
                <Text style={ this.props.light ? style.countTextStyle :style.countTextStyleDark }>
                    { this.state.wachtwoord.length } / 50 tekens
                </Text>
                { this.renderButton() }
            </Form>
        )
    }
}