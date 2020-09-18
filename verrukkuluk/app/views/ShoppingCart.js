import React, { Component } from 'react';
import { Container, Content, Text, Card, CardItem } from 'native-base';
import * as Style from '../resources/styles/styles';
import Head from '../components/Head';
import Foot from '../components/Foot';


export default class ShoppingCart extends Component
{
    render() {
        return(
            <Container style={{ backgroundColor: Style.darkRed }}>
                <Head title="mijn lijstje" />
                <Content style={{ padding: 10 }}>
                    <Card style={ Style.cardStyle }>
                        <CardItem style={ Style.cardItemStyle }>
                            <Text style={ Style.titleStyle }>
                                mijn boodschappenlijstje
                            </Text>
                        </CardItem>
                    </Card>
                </Content>
                <Foot />
            </Container>
        )
    }
}