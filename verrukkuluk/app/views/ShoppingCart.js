import React, { Component } from 'react';
import { Container, Content, Text, View } from 'native-base';
import { darkRed } from '../resources/styles/styles';
import Head from '../components/Head';
import Foot from '../components/Foot';


export default class ShoppingCart extends Component
{
    render() {
        return(
            <Container style={{ backgroundColor: darkRed }}>
                <Head title="mijn lijstje" login={ this.props.login } loginChange={ this.props.loginChange } />
                    <Content>
                        <View>
                            <Text>Shopping!</Text>
                        </View>                    
                    </Content>
                <Foot />
            </Container>
        )
    }
}