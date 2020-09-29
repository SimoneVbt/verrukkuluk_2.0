import React, { Component } from 'react';
import { Container, Content, View, Text } from 'native-base';
import * as style from '../resources/styles/styles';
import Head from '../components/Head';
import Foot from '../components/Foot';


export default class Search extends Component
{
    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="zoeken" />
                <Content>
                    <View>
                        <Text>Zoeken!</Text>
                    </View>                
                </Content>
                <Foot />
            </Container>
        )
    }
}