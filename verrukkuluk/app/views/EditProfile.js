import React, { Component } from 'react';
import { Container, Content, View, Text, Card, CardItem } from 'native-base';
import * as style from '../resources/styles/styles';
import Head from '../components/Head';
import UserDetailsForm from '../components/UserDetailsForm';

export default class EditProfile extends Component
{
    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="bewerk profiel" />
                <Content style={{ padding: 10 }}>
                    <Card style={ style.cardStyle }>
                        <CardItem style={ style.cardItemStyle }>
                            <Text style={ style.titleStyle }>
                                Bewerk profiel
                            </Text>
                        </CardItem>
                        <View style={{ width: "95%", alignSelf: "center" }}>
                            <UserDetailsForm light edit />
                        </View>
                    </Card>
                </Content>
            </Container>
        )
    }
}