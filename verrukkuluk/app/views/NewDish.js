import React, { Component } from 'react';
import { Container, Content, Button, Card, CardItem, Text } from 'native-base';
import * as style from '../resources/styles/styles.js';
import Head from '../components/Head';
import Foot from '../components/Foot';

export default class NewDish extends Component
{
    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="nieuw gerecht" />
                <Content style={{ padding: 10 }}>
                    <Card style={ style.cardStyle }>
                        <CardItem style={ style.cardItemStyle }>
                            <Text style={ style.titleStyle }>
                                nieuw gerecht
                            </Text>
                        </CardItem>
                    </Card>
                </Content>
                <Foot />
            </Container>

        )
    }
}