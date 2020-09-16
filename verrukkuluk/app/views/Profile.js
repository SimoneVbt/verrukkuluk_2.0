import React, { Component, Fragment } from 'react';
import { Container, Content, View, Text, Card, CardItem, Thumbnail, Grid, Col } from 'native-base';
import { darkRed, beige, cardStyle, cardItemStyle, titleStyle } from '../resources/styles/styles';
import Head from '../components/Head';
import Foot from '../components/Foot';
import API from '../api/API';


export default class Profile extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        let user = API.fetchFromDatabase("gebruiker");
        if (user) {
            this.setState({
                user: user[0]
            })
        }
    }


    //grid en col implementeren
    _renderProfile() {
        if (this.state.user) {
            return(
                <Fragment>
                    <CardItem style={ cardItemStyle }>
                        {/* <Thumbnail square source={{ uri: this.state.user.foto }} style={{ width: "100%", height: 100 }} /> */}
                        <Text>
                            Hey { this.state.user.gebruikersnaam }!
                        </Text>
                    </CardItem>                            
                    <CardItem style={ cardItemStyle }>
                        <Text>
                            Gebruikersnaam: { this.state.user.gebruikersnaam }
                        </Text>
                        <Text>
                            Email: { this.state.user.email }
                        </Text>
                    </CardItem>
                </Fragment>
            )
        } else {
            return(
                <CardItem style={ cardItemStyle }>
                    <Text style={{ padding: 10 }}>
                        Er is iets misgegaan. Probeer later opnieuw.
                    </Text>
                </CardItem>
            )
        }
    }


    render() {
        return(
            <Container style={{ backgroundColor: darkRed }}>
                <Head title="mijn profiel" />
                <Content style={{ padding: 10 }}>
                    <View style={{ paddingBottom: 18}}>
                        <Card style={ cardStyle }>
                            <CardItem style={ cardItemStyle }>
                                <Text style={ titleStyle }>
                                    mijn profiel
                                </Text>
                            </CardItem>
                            { this._renderProfile() }
                        </Card>
                    </View>
                </Content>
                <Foot />
            </Container>
        )
    }
}