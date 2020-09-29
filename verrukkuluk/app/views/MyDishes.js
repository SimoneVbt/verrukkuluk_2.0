import React, { Component } from 'react';
import { Container, Content, Button, Card, CardItem, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as style from '../resources/styles/styles.js';
import Head from '../components/Head';
import Foot from '../components/Foot';

export default class MyDishes extends Component
{
    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="mijn gerechten" />
                <Content style={{ padding: 10 }}>
                    <Card style={ style.cardStyle }>
                        <CardItem style={ style.cardItemStyle }>
                            <Text style={ style.titleStyle }>
                                mijn gerechten
                            </Text>
                        </CardItem>
                        <CardItem style={ style.cardItemStyle }>
                            <Button style={ style.buttonStyle }
                                    onPress = { () => Actions.NewDish() }>
                                <Text>
                                    voeg gerecht toe
                                </Text>
                            </Button>
                        </CardItem>
                    </Card>

                    {/* loopen over dishcards met eigen gerechten */}

                </Content>
                <Foot />
            </Container>

        )
    }
}