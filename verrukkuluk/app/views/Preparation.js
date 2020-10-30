import React, { Component } from 'react';
import { Container, Content, Text, View, Card, CardItem, Form, Input, Item, Label, Button, Icon, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as style from '../resources/styles/styles';
import * as constants from '../config/constants';
import API from '../api/API.js';
import Head from '../components/Head';
import { Picker } from '@react-native-community/picker';


export default class Preparation extends Component
{
    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="bereidingsstappen toevoegen" />
                <Content style={{ padding: 10 }}>
                <Card style={ style.cardStyle }>
                        <CardItem style={ style.cardItemStyle }>
                            <Text style={ style.titleStyle }>
                                bereidingsstappen toevoegen
                            </Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}