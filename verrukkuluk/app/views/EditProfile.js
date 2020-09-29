import React, { Component } from 'react';
import { Container, Content, View, Text, Card, CardItem, Thumbnail, Grid, Col, Button } from 'native-base';
import * as style from '../resources/styles/styles';
import Head from '../components/Head';
import API from '../api/API';

export default class EditProfile extends Component
{
    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="bewerk profiel" />
                <Content style={{ padding: 10 }}>
                    <View>
                        <Card style={ style.cardStyle }>
                            <CardItem style={ style.cardItemStyle }>
                                <Text style={ style.titleStyle }>
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