import React, { Component } from 'react';
import { Container, Content, View, Text, Card, CardItem, Thumbnail, Grid, Col, Button } from 'native-base';
import * as Style from '../resources/styles/styles';
import Head from '../components/Head';
import API from '../api/API';

export default class EditProfile extends Component
{
    render() {
        return(
            <Container style={{ backgroundColor: Style.darkRed }}>
                <Head title="bewerk profiel" />
                <Content style={{ padding: 10 }}>
                    <View>
                        <Card style={ Style.cardStyle }>
                            <CardItem style={ Style.cardItemStyle }>
                                <Text style={ Style.titleStyle }>
                                    Bewerk profiel
                                </Text>
                            </CardItem>
                        </Card>
                    </View>
                </Content>
            </Container>

        )
    }
}