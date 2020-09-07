import React, { Component } from 'react';
import { Container, Content, View, Text } from 'native-base';
import { darkRed } from '../resources/styles/styles';
import Head from '../components/Head';
import Foot from '../components/Foot';

export default class Favorites extends Component
{
    render() {
        return(
            <Container style={{ backgroundColor: darkRed }}>
                <Head title="mijn favorieten" login={ this.props.login } loginChange={ this.props.loginChange } />
                <Content>
                    <View>
                        <Text>Favorieten!</Text>
                    </View>                     
                </Content>
               <Foot />
            </Container>
        )
    }
}