import React, { Component } from 'react';
import { Container, Content, Text, View,
        Card, CardItem, Button, Spinner,
        Form, Textarea, Input, Label, Item  } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as style from '../resources/styles/styles.js';
import * as constants from '../config/constants';
import API from '../api/API.js';
import Head from '../components/Head';
import Foot from '../components/Foot';
import base64 from 'react-native-base64';
import { Picker } from '@react-native-community/picker';
import PhotoInterface from '../components/PhotoInterface';


export default class NewDish extends Component
{
    state = {
        photoMenuVisible: false,
        kitchens: [],
        types: [],
        isLoaded: false,
        error: false,
        isLoading: false, //submit
        submitError: false, //submit
        id: 0,
        picture: "",
        kitchen: "",
        kitchenId: 0,
        type: "",
        typeId: 0,
        title: "",
        shortDescription: "",
        longDescription: ""
    }


    componentDidMount() {
        const kitchens = API.fetchData({ url: constants.kitchenUrl, table: "keukentype", filter: 'record_type = "K"', sort: "omschrijving" })
        const types = API.fetchData({ url: constants.typeUrl, table: "keukentype",  filter: 'record_type = "T"', sort: "omschrijving" })

        Promise.all([kitchens, types])
            .then( values =>
                this.setState({
                    isLoaded: true,
                    kitchens: values[0],
                    types: values[1]
                })
            )
            .catch( error => {
                console.warn(error);
                this.setState({
                    isLoaded: true,
                    error: true
                })
            })

        if (this.props.dish) {
            let dish = this.props.dish;
            this.setState({
                id: dish.id,
                picture: dish.afbeelding,
                kitchen: dish.keuken,
                kitchenId: dish.keuken_id,
                type: dish.type,
                typeId: dish.type_id,
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


    handleValueChange(value, index, type) {
        if (value == null) { return }
        
        function findKt(kt) {
            return kt.omschrijving === value
        }
        const object = type === "kitchen" ? this.state.kitchens.find(findKt) : this.state.types.find(findKt);
        const typeId = type + "Id";
        
        this.setState({
            [type]: value,
            [typeId]: object.id
        })
    }


    submit() {
        if (!this.state.picture) {
            return false; // errorbericht maken!
        }
        // in db/api: kolom datum_bewerkt maken?
        const base64Picture = base64.encode(this.state.picture);
        const data = {
            id: this.state.id > 0 ? this.state.id : false,
            keuken_id: this.state.kitchenId,
            type_id: this.state.typeId,
            titel: this.state.title,
            korte_omschrijving: this.state.shortDescription,
            lange_omschrijving: this.state.longDescription,
            afbeelding: base64Picture
        }

        // post lukt, maar updatet niets in db
        API.postData({ url: constants.createDishUrl, type: "post", data: data, user: true })
            .then( result => console.warn("toegevoegd/bijgewerkt")) //Actions.pop() )
            .catch( error => console.warn(error) )
    }


    renderForm() {
        if (this.state.error) {
            return(
                <CardItem style={ style.cardItemStyle }>
                    <Text>
                        Er is iets misgegaan. Probeer later opnieuw.
                    </Text>
                </CardItem>
            )
        }
        if (this.state.isLoaded) {
            return(
                <Form>
                    <PhotoInterface picture={ this.state.picture } setPictureCallback={ this.setPictureCallback } />
                    <CardItem style={ style.cardItemStyle }>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Item stackedLabel style={{ flex: 1 }}>
                                <Label style={ style.darkLabelStyle }>Keuken</Label>
                                <Picker style={{ width: "100%" }}
                                        selectedValue={ this.state.kitchen }
                                        onValueChange={ (value, index) => this.handleValueChange(value, index, "kitchen") }>
                                    <Picker.Item label="(keuken)" value={null} />
                                    {
                                        this.state.kitchens.map( kitchen => 
                                            <Picker.Item label={ kitchen.omschrijving } value={ kitchen.omschrijving } key={ kitchen.id } />
                                        )
                                    }
                                </Picker>
                            </Item>
                            <Item stackedLabel style={{ flex: 1 }}>
                                <Label style={ style.darkLabelStyle }>Type</Label>
                                <Picker style={{ width: "100%" }}
                                        selectedValue={ this.state.type }
                                        onValueChange={ (value, index) => this.handleValueChange(value, index, "type") }>
                                    <Picker.Item label="(type)" value={null} />
                                    {
                                        this.state.types.map( type => 
                                            <Picker.Item label={ type.omschrijving } value={ type.omschrijving } key={ type.id } />
                                        )
                                    }
                                </Picker>
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
                        <Text style={{ fontSize: 12, marginLeft: 10, marginTop: -5, fontStyle: "italic" }}>
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
                        <Text style={{ fontSize: 12, marginLeft: 10, marginTop: -5, fontStyle: "italic" }}>
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
                        <Text style={{ fontSize: 12, marginLeft: 10, marginTop: -5, marginBottom: 10, fontStyle: "italic" }}>
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
        return(
            <Spinner color={ style.darkRed } size={50} style={{ marginVertical: 10 }} />
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