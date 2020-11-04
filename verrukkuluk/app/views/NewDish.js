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
import ImgToBase64 from 'react-native-image-base64';
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
        noPicture: false,
        fieldEmpty: false,
        isLoading: false,
        submitError: false,
        pictureError: false,
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
        const kitchens = API.fetchData({
            url: constants.kitchenUrl,
            table: "keukentype",
            filter: 'record_type = "K"',
            sort: "omschrijving"
        })
        const types = API.fetchData({ 
            url: constants.typeUrl,
            table: "keukentype",
            filter: 'record_type = "T"',
            sort: "omschrijving"
        })

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
            this.setState({ picture: this.props.picture });
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


    _processSubmit(picture) {
        const data = {
            keuken_id: this.state.kitchenId,
            type_id: this.state.typeId,
            titel: this.state.title,
            korte_omschrijving: this.state.shortDescription,
            lange_omschrijving: this.state.longDescription,
            afbeelding: picture
        }
        if (this.props.dish) {
            data.id = this.props.dish.id;
        }

        API.postData({
            url: constants.createDishUrl,
            table: "gerecht",
            type: "post",
            data: data,
            user: true
        })
        .then( dish => {
            if (this.props.dish) {
                Actions.pop({ refresh: {} });
            } else {
                Actions.Ingredients({ dish: dish });
            }
        })
        .catch( error => {
            console.warn(error)
            this.setState({
                isLoading: false,
                submitError: true 
            });
        });
    }


    submit() {
        if (!this.state.picture) {
            this.setState({ noPicture: true });
            return;
        } 
        if (this.state.kitchenId === 0 || this.state.typeId === 0 || this.state.title.length === 0 || this.state.shortDescription.length === 0 || this.state.longDescription.length === 0) {
            this.setState({ fieldEmpty: true, noPicture: false });  
            return;
        }

        this.setState({ isLoading: true }, () => {

            if (this.state.picture.indexOf("data:image/jpeg;base64,") != -1) {
                this._processSubmit(this.state.picture);

            } else {
                ImgToBase64.getBase64String(this.state.picture)
                .then( base64string => {
                    const picture = "data:image/jpeg;base64," + base64string;
                    this._processSubmit(picture);
                })
                .catch( error => {
                    console.warn(error);
                    this.setState({
                        pictureError: true,
                        isLoading: false
                    });
                });
            }
            
        });

    }

    renderError() {
        
        let text = this.state.noPicture ? "Voeg aub een afbeelding toe" :
                this.state.fieldEmpty ? "Vul aub alle velden in" :
                this.state.pictureError ? "Er is iets fout gegaan met het verwerken van de afbeelding" :
                this.state.submitError ? "Er is iets fout gegaan met verzenden. Probeer later opnieuw" :
                "";

        if (text != "") {
            return(
                <CardItem style={ style.cardItemStyle }>
                    <Text style={{ color: style.darkRed, marginLeft: 10 }}>
                        { text }
                    </Text>
                </CardItem>
            )
        }
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
                                <Label style={ style.labelStyle }>Keuken</Label>
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
                                <Label style={ style.labelStyle }>Type</Label>
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
                            <Label style={ style.labelStyle }>Titel</Label>
                            <Input value={ this.state.title }
                                    onChangeText={ (text) => this.handleChange(text, "title") }
                                    maxLength={50}
                            />
                        </Item>
                    </CardItem>
                    <CardItem style={ style.cardItemStyle }>
                        <Text style={ style.countTextStyle }>
                            { this.state.title.length } / 50 tekens
                        </Text>
                    </CardItem>
                    <CardItem style={ style.cardItemStyle }>
                        <Item stackedLabel style={{ width: "100%" }}>
                            <Label style={ style.labelStyle }>Korte omschrijving</Label>
                            <Textarea value={ this.state.shortDescription }
                                        onChangeText={ (text) => this.handleChange(text, "shortDescription") }
                                        maxLength={250}
                                        rowSpan={3}
                                        style={{ width: "100%" }}
                            />
                        </Item>
                    </CardItem>
                    <CardItem style={ style.cardItemStyle }>
                        <Text style={ style.countTextStyle }>
                            { this.state.shortDescription.length } / 250 tekens
                        </Text>
                    </CardItem>
                    <CardItem style={ style.cardItemStyle }>
                        <Item stackedLabel style={{ width: "100%" }}>
                            <Label style={ style.labelStyle }>Lange omschrijving</Label>
                            <Textarea value={ this.state.longDescription }
                                        onChangeText={ (text) => this.handleChange(text, "longDescription") }
                                        maxLength={1500}
                                        rowSpan={6}
                                        style={{ width: "100%" }}
                            />
                        </Item>
                    </CardItem>
                    <CardItem style={ style.cardItemStyle }>
                        <Text style={ style.countTextStyle }>
                            { this.state.longDescription.length } / 1500 tekens
                        </Text>
                    </CardItem>
                    { this.renderError() }
                    <CardItem style={ style.cardItemStyle }>
                        <Button block 
                                onPress={ () => this.submit() }
                                style={ style.fullButtonStyle }>
                            { 
                                this.state.isLoading &&
                                    <Spinner color={ style.white } style={{ marginLeft: -36 }} />
                            }
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
                <Head title={ this.props.dish ? this.props.dish.titel : "nieuw gerecht"} />
                <Content style={{ padding: 10 }}>
                    <Card style={ style.cardStyle }>
                        <CardItem style={ style.cardItemStyle }>
                        <Text style={ style.titleStyle }>
                            {
                                this.props.dish ?
                                "bewerk gerecht" :
                                "nieuw gerecht"
                            }
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