import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Container, Content, Button, Text, Form, Item, Label, Input } from 'native-base';
import { darkRed, white } from '../resources/styles/styles';
import Head from '../components/Head';
import Foot from '../components/Foot';

const itemStyle = {
    margin: 10
}
const labelStyle = {
    color: white
}
const inputStyle = {
    color: white
}

export default class Login extends Component
{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container style={{ backgroundColor: darkRed }}>
                <Head title="inloggen" login={ this.props.login } loginChange={ this.props.loginChange } />
                    <KeyboardAvoidingView behavior="height" contentContainerStyle={{ flex: 1, padding: 20, paddingRight: 50, paddingBottom: 75, marginTop: 10 }} >
                        <Form>
                            <Item stackedLabel style={ itemStyle }>
                                <Label style={ labelStyle }>Gebruikersnaam / Email</Label>
                                <Input style={ inputStyle } />
                            </Item>
                            <Item stackedLabel style={ itemStyle }>
                                <Label style={ labelStyle }>Wachtwoord</Label>
                                <Input style={ inputStyle } secureTextEntry />
                            </Item>
                            <Button style={{ alignSelf: "center", marginTop: 20 }}>
                                <Text>Inloggen!</Text>
                            </Button>                            
                        </Form>
                    </KeyboardAvoidingView>
                <Foot />
            </Container>

        )
    }
}