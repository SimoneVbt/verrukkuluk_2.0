import React, { Component } from 'react';
import { Container, Content, Text, Card, CardItem } from 'native-base';
import * as style from '../resources/styles/styles';
import Head from '../components/Head';
import Foot from '../components/Foot';


export default class ShoppingCart extends Component
{
    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="mijn lijstje" />
                <Content style={{ padding: 10 }}>
                    <Card style={ style.cardStyle }>
                        <CardItem style={ style.cardItemStyle }>
                            <Text style={ style.titleStyle }>
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