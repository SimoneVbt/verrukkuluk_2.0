import React, { Component } from 'react';
import { Container, Form, Item, Label, Input, Spinner,
    Thumbnail, Grid, Col, Button, Text, View } from 'native-base';
import * as style from '../resources/styles/styles';
import Head from '../components/Head';
import API from '../api/API';

export default class Register extends Component
{
    state = {
        username: "",
        email: "",
        wachtwoord: "",
        isLoading: false,
        failure: false,
        error: false
    }

    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="registreren" noSearch />
                    <ScrollView style={{ flex: 1, padding: 20, paddingRight: 30 }}>
                        <Form>

                        </Form>
                    </ScrollView>
            </Container>

        )
    }
}