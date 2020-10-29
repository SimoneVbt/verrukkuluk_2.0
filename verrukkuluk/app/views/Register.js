import React, { Component } from 'react';
import { Container, View } from 'native-base';
import * as style from '../resources/styles/styles';
import Head from '../components/Head';
import UserDetailsForm from '../components/UserDetailsForm';

export default class Register extends Component
{
    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="registreren" noSearch />
                <View style={{ flex: 1, padding: 20, paddingRight: 30 }}>
                    <UserDetailsForm dark register />
                </View>
            </Container>
        )
    }
}