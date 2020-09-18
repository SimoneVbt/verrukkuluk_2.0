import React, { Component } from 'react';
import { Container, Content, Button, Card, CardItem, Text } from 'native-base';
import * as Style from '../resources/styles/styles.js';
import Head from '../components/Head';
import Foot from '../components/Foot';

export default class NewDish extends Component
{
    render() {
        return(
            <Container style={{ backgroundColor: Style.darkRed }}>
                <Head title="nieuw gerecht" />
                <Content style={{ padding: 10 }}>
                    <Card style={ Style.cardStyle }>
                        <CardItem style={ Style.cardItemStyle }>
                            <Text style={ Style.titleStyle }>
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