import React, { Component } from 'react';
import { Container, Content, Text, View,
    Card, CardItem, Button, Thumbnail,
    Form, Textarea, Input, Label, Item  } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as style from '../resources/styles/styles.js';
import Head from '../components/Head';
import Foot from '../components/Foot';


export default class NewDish extends Component
{
    state = {
        picture: false,
        isLoading: false,
        error: false
    }


    componentDidUpdate(prevProps) {
        if (prevProps.picture != this.props.picture) {
            this.setState({ picture: this.props.picture })
        }
    }
    

    renderPicture() {
        if (this.state.picture) {
            return(
                <Thumbnail square source={{ uri: this.state.picture }} style={{ width: "100%", height: "100%" }} />
            )
        }
        return(
            <Text style={{ textAlign: "center" }}>
                Geen afbeelding gekozen
            </Text>            
        )
    }


    renderUpload() {
        return(
            <View style={{ flexDirection: "column", flex: 1, alignItems: "center", marginVertical: 10 }}>
                <View style={{ borderColor: style.darkRed, borderTopWidth: 2, borderBottomWidth: 2,
                                height: 180, width: "100%", marginVertical: 5,
                                justifyContent: "center", alignItems: "center" }}>
                    { this.renderPicture() }
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                    <Button onPress={ () => Actions.Camera() }
                            style={ style.buttonStyle }>
                        <Text style={ style.buttonTextStyle }>
                            Maak een foto
                        </Text>
                    </Button>
                    <Button style={ style.buttonStyle }>
                        <Text style={ style.buttonTextStyle }>
                            Kies uit album
                        </Text>
                    </Button>                    
                </View>
            </View>
        )        
    }


    renderForm() {
        return(
            <Form>
                { this.renderUpload() }
                <CardItem style={ style.cardItemStyle }>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Item stackedLabel style={{ flex: 1 }}>
                            <Label>Keuken</Label>
                            <Input />
                        </Item>
                        <Item stackedLabel style={{ flex: 1 }}>
                            <Label>Type</Label>
                            <Input />
                        </Item>
                    </View>
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    <Item stackedLabel style={{ width: "100%" }}>
                        <Label>Titel</Label>
                        <Input />
                    </Item>                    
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    <Textarea placeholder="korte omschrijving..." />
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    <Textarea placeholder="lange omschrijving..." />
                </CardItem>                
                <CardItem style={ style.cardItemStyle }>
                    <Button block style={ style.fullButtonStyle }>
                        <Text style={ style.buttonTextStyle }>
                            toevoegen
                        </Text>
                    </Button>
                </CardItem>
            </Form>
        )
    }
    
    
    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="nieuw gerecht" />
                <Content style={{ padding: 10 }}>
                    <Card style={ style.cardStyle }>
                        <CardItem style={ style.cardItemStyle }>
                            <Text style={ style.titleStyle }>
                                nieuw gerecht
                            </Text>
                        </CardItem>
                        { this.renderForm() }
                    </Card>
                    <View style={{ padding: 10 }} />
                </Content>
                <Foot />
            </Container>

        )
    }
}