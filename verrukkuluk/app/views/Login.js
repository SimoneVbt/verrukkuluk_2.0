import React, { Component } from 'react';
import { Content, Button, Text } from 'native-base';

export default class Login extends Component
{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Content>
                <Button>
                    <Text>Inloggen!</Text>
                </Button>
            </Content>
        )
    }
}