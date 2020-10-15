import React, { Component } from 'react';
import { Container, Content, Text, View,
        Card, CardItem, Button, Thumbnail,
        Form, Textarea, Input, Label, Item  } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as style from '../resources/styles/styles.js';
import Head from '../components/Head';
import Foot from '../components/Foot';
import base64 from 'react-native-base64';
import PhotoInterface from '../components/PhotoInterface';
import API from '../api/API.js';


export default class NewDish extends Component
{
    state = {
        photoMenuVisible: false,
        isLoading: false,
        error: false,
        id: 0,
        picture: "",
        kitchen: "",
        type: "",
        title: "",
        shortDescription: "",
        longDescription: ""
    }


    componentDidMount() {
        if (this.props.dish) {
            let dish = this.props.dish;
            this.setState({
                id: dish.id,
                picture: dish.afbeelding,
                kitchen: dish.keuken,
                type: dish.type,
                title: dish.titel,
                shortDescription: dish.korte_omschrijving,
                longDescription: dish.lange_omschrijving
            })
        }
    }
    

    componentDidUpdate(prevProps) {
        if (prevProps.picture != this.props.picture) {
            this.setState({ picture: this.props.picture })
        }
    }


    setPictureCallback = (imageUri) => {
        this.setState({ picture: imageUri });
    }


    handleChange(text, type) {
        this.setState({ [type]: text })
    }


    // keuken/type: fetchen!
    // keuken/type: select maken, kiezen uit database
    submit() {
        const base64Picture = base64.encode(this.state.picture);
        const data = {
            id: this.state.id > 0 ? this.state.id : false,
            //keuken_id: this.state.keuken,
            //type_id: this.state.type,
            titel: this.state.title,
            korte_omschrijving: this.state.shortDescription,
            lange_omschrijving: this.state.longDescription,
            afbeelding: base64Picture
        }

        // API.postData({ url: ..., type: "post", data: data, user: true })
        //     .then( Actions.pop() )
        //     .catch( error => console.warn(error) )
    }


    renderForm() {
        return(
            <Form>
                <PhotoInterface picture={ this.state.picture } setPictureCallback={ this.setPictureCallback } />
                <CardItem style={ style.cardItemStyle }>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Item stackedLabel style={{ flex: 1 }}>
                            <Label style={ style.darkLabelStyle }>Keuken</Label>
                            <Input value={ this.state.kitchen }
                                    onChangeText={ (text) => this.handleChange(text, "kitchen") }
                            />
                        </Item>
                        <Item stackedLabel style={{ flex: 1 }}>
                            <Label style={ style.darkLabelStyle }>Type</Label>
                            <Input value={ this.state.type }
                                    onChangeText={ (text) => this.handleChange(text, "type") }
                            />
                        </Item>
                    </View>
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    <Item stackedLabel style={{ width: "100%" }}>
                        <Label style={ style.darkLabelStyle }>Titel</Label>
                        <Input value={ this.state.title }
                                onChangeText={ (text) => this.handleChange(text, "title") }
                                maxLength={50}
                        />
                    </Item>
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    <Text style={{ alignSelf: "flex-end", fontSize: 12, marginLeft: 10, marginTop: -5, fontStyle: "italic" }}>
                        { this.state.title.length } / 50 tekens
                    </Text>
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    <Item stackedLabel style={{ width: "100%" }}>
                        <Label style={ style.darkLabelStyle }>Korte omschrijving</Label>
                        <Textarea value={ this.state.shortDescription }
                                    onChangeText={ (text) => this.handleChange(text, "shortDescription") }
                                    maxLength={250}
                                    rowSpan={3}
                        />
                    </Item>
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    <Text style={{ alignSelf: "flex-end", fontSize: 12, marginLeft: 10, marginTop: -5, fontStyle: "italic" }}>
                        { this.state.shortDescription.length } / 250 tekens
                    </Text>
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    <Item stackedLabel style={{ width: "100%" }}>
                        <Label style={ style.darkLabelStyle }>Lange omschrijving</Label>
                        <Textarea value={ this.state.longDescription }
                                    onChangeText={ (text) => this.handleChange(text, "longDescription") }
                                    maxLength={1500}
                                    rowSpan={6}
                        />
                    </Item>
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    <Text style={{ alignSelf: "flex-end", fontSize: 12, marginLeft: 10, marginTop: -5, fontStyle: "italic" }}>
                        { this.state.longDescription.length } / 1500 tekens
                    </Text>
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    <Button block 
                            onPress={ () => this.submit() }
                            style={ style.fullButtonStyle }>
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