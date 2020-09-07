import React, { Component } from 'react';
import { Container, Content, View, Text } from 'native-base';
import { darkRed } from '../resources/styles/styles.js';
import Head from '../components/Head';
import Foot from '../components/Foot';

export default class MyDishes extends Component
{
    render() {
        return(
            <Container style={{ backgroundColor: darkRed }}>
                <Head title="mijn gerechten" login={ this.props.login } loginChange={ this.props.loginChange } />
                <Content>
                    <View>
                        <Text>Mijn gerechten!</Text>
                    </View>
                </Content>
                <Foot />
            </Container>

        )
    }
}