import React, { Component } from 'react';
import { Container, Content, Button, Text } from 'native-base';
import { darkRed } from '../resources/styles/styles';
import Head from '../components/Head';
import Foot from '../components/Foot';


export default class Login extends Component
{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container style={{ backgroundColor: darkRed }}>
                <Head title="inloggen" login={ this.props.login } loginChange={ this.props.loginChange } />
                    <Content>
                        <Button>
                            <Text>Inloggen!</Text>
                        </Button>
                    </Content>
                <Foot />
            </Container>

        )
    }
}