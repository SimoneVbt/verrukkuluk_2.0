import React, { Component } from 'react';
import { Modal } from 'react-native';
import { Text, Icon, View, Button, Spinner, Form, Item, Input, Label } from 'native-base';
import * as style from '../resources/styles/styles.js';
import * as constants from '../config/constants';
import API from '../api/API';
import { Actions } from 'react-native-router-flux';

export default class PasswordMenu extends Component
{
    state = {
        newPassword: "",
        currentPassword: "",
        currentPassword2: "",
        fieldEmpty: false,
        differentPasswordsError: false,
        wrongPasswordError: false,
        isLoading: false,
        error: false
    }


    renderError() {
        let text = this.state.fieldEmpty ? "Vul a.u.b. alle velden in" :
                    this.state.differentPasswordsError ? "Je ingevoerde huidige wachtwoorden komen niet overeen" :
                    this.state.wrongPasswordError ? "Je ingevoerde huidige wachtwoord is incorrect" :
                    this.state.error ? "Fout van de server bij het versturen van het formulier" : false;

        if (text) {
            return(
                <Text style={ style.messageStyle }>
                    { text }
                </Text>
            )
        }
    }


    checkCurrentPassword() {
        if (!this.state.newPassword|| !this.state.currentPassword || !this.state.currentPassword2) {
            this.setState({ fieldEmpty: true });
            return false;
        }
        if (this.state.currentPassword !== this.state.currentPassword2) {
            this.setState({ differentPasswordsError: true, fieldEmpty: false });
            return false;

        }
        if (this.state.currentPassword !== this.props.user.wachtwoord) {
            this.setState({ wrongPasswordError: true, differentPasswordsError: false, fieldEmpty: false });
            return false;
        }

        this.setState({
            fieldEmpty: false,
            differentPasswordsError: false,
            wrongPasswordError: false
        })
        return true;
    }


    submit() {
        if (this.checkCurrentPassword()) {

            this.setState({ isLoading: true }, () => {

                let user = API.fetchFromDatabase("gebruiker", 1);
                const data = {
                    id: user.remote_id,
                    email: user.email,
                    gebruikersnaam: user.gebruikersnaam,
                    wachtwoord: this.state.newPassword
                }

                API.postData({
                    url: constants.newUserUrl,
                    type: "post",
                    table: "gebruiker",
                    data: data,
                    edit: true
                })
                .then( result => Actions.pop() )
                .catch( error => {
                    console.warn(error);
                    this.setState({
                        isLoading: false,
                        error: true })
                })
            })
        }
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
                    <Label style={ style.labelStyle }>Nieuw wachtwoord</Label>
                    <Input value={ this.state.newPassword }
                            onChangeText={ (text) => this.handleChange(text, "newPassword") }
                            secureTextEntry
                            maxLength={50}
                            style={ style.inputStyle } />
                </Item>
                <Item stackedLabel style={ style.itemStyle }>
                    <Label style={ style.labelStyle }>Huidig wachtwoord</Label>
                    <Input value={ this.state.currentPassword }
                            onChangeText={ (text) => this.handleChange(text, "currentPassword") }
                            secureTextEntry
                            maxLength={50}
                            style={ style.inputStyle } />
                </Item>
                <Item stackedLabel style={ style.itemStyle }>
                    <Label style={ style.labelStyle }>Huidig wachtwoord (bevestiging)</Label>
                    <Input value={ this.state.currentPassword2 }
                            onChangeText={ (text) => this.handleChange(text, "currentPassword2") }
                            secureTextEntry
                            maxLength={50}
                            style={ style.inputStyle } />
                </Item>
                <Button full
                        onPress={ () => this.submit() }
                        style={ style.buttonStyle} >
                    <Text style={ style.buttonTextStyle }>
                        verzenden
                    </Text>
                </Button>
            </Form>
        )
    }


    render() {
        return(
            <Modal visible={ this.props.passwordMenuVisible } transparent>
                <View style={ style.overlay }>
                    <View style={ style.modalStyle }>
                        <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                            <View style={{ flex: 4 }}>
                                <Text style={ style.subtitleStyle }>
                                    Wachtwoord veranderen
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Button transparent small iconLeft
                                        onPress={ () => this.props.setPasswordMenuVisible(false) }>
                                    <Icon name="cross" type="Entypo" style={{ color: style.darkRed, fontSize: 40 }} />
                                </Button>                                    
                            </View>
                        </View>
                        { this.renderError() }
                        { this.renderForm() }
                        {
                            this.state.isLoading && 
                            <View style={ style.overlay }>
                                <Spinner color={ style.darkRed } size={50} />
                            </View>
                        }
                    </View>
                </View>
            </Modal>
        )
    }
}