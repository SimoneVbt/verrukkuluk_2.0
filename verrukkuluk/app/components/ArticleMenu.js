import React, { Component } from 'react';
import { Modal } from 'react-native';
import { View, Text, Thumbnail, Button, Spinner, Icon, Item, Input } from 'native-base';
import * as style from '../resources/styles/styles';
import * as constants from '../config/constants';
import API from '../api/API';


export default class ArticleMenu extends Component
{
    state = {
        amount: this.props.item.aantal,
        packages: this.props.item.aantal_verpakkingen,
        price: this.props.item.totale_prijs,
        isLoading: false,
        error: false
    }


    submitAmount() {
        this.setState({ isLoading: true }, () => {
            API.postData({ 
                url: constants.setAmountUrl,
                type: "post",
                table: "boodschappen",
                data: { 
                    id: this.props.item.id,
                    aantal: this.state.amount
                }
            })
            .then( result => {
                this.props.loadData();
                this.setState({ isLoading: false });
                this.props.setArticleMenuVisible(false);
            })
            .catch( error => {
                console.warn(error);
                this.setState({ isLoading: false });
            })
        });

    }


    handleChange(newAmount) {
       let newPackages = Math.ceil( newAmount / this.props.item.verpakking );
       let newPrice = newPackages * this.props.item.prijs;

        this.setState({
            amount: newAmount,
            packages: newPackages,
            price: newPrice
        });
    }


    render() {
        const { articleMenuVisible } = this.props;
        return(
            <Modal visible={ articleMenuVisible } transparent>
                <View style={ style.overlay }>
                    <View style={ style.modalStyle }>
                        <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                            <View style={{ flex: 4 }}>
                                <Text style={ style.subtitleStyle }>
                                    Pas de hoeveelheid aan
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Button transparent small iconLeft
                                        onPress={ () => this.props.setArticleMenuVisible(!articleMenuVisible) }>
                                    <Icon name="cross" type="Entypo" style={{ color: style.darkRed, fontSize: 40 }} />
                                </Button>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 2 }}>
                                <Thumbnail large source={{ uri: this.props.item.afbeelding }} />
                            </View>
                            <View style={{ flex: 3 }}>
                                <Text style={{ textTransform: "capitalize", color: style.darkRed }}>
                                    { this.props.item.product }
                                </Text>
                                <Text>
                                    Verpakking: { this.props.item.verpakking } { this.props.item.eenheid }
                                    {"\n"} Prijs: € { this.props.item.prijs.toFixed(2).toString().replace(".", ",") }
                                </Text>                                
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", paddingVertical: 10, justifyContent: "flex-end" }}>
                            <Item style={{ width: 60, marginLeft: -10 }}>
                                <Input name="aantal"
                                        keyboardType="numeric"
                                        textAlign="center"
                                        value={ this.state.amount.toString() }
                                        onChangeText={ (newAmount) => this.handleChange(newAmount) } />
                            </Item>
                            <Text style={{ alignSelf: "center", paddingRight: 10 }}>
                                { " " + this.props.item.eenheid }
                            </Text>
                            <Button style={ style.buttonStyle }
                                    onPress={ () => this.submitAmount() }>
                                <Text style={ style.buttonTextStyle }>
                                    bewerken
                                </Text>
                            </Button>
                        </View>
                        <View style={{ flexDirection: "column", alignItems: "center", paddingBottom: 10, marginRight: 50 }}>
                            <Text style={{ fontStyle: "italic" }}>
                                ({ this.state.packages } { this.state.packages == 1 ? "product" : "producten" })
                            </Text>
                            <Text style={{ color: style.darkRed }}>
                                Totaal:{ " " }
                                <Text>
                                € { this.state.price.toFixed(2).toString().replace(".", ",") }
                                </Text>
                            </Text>
                        </View>
                        {
                            this.state.isLoading &&
                            <View style={ style.overlay }>
                                <Spinner color={ style.darkRed } size={50} />
                            </View>
                        }
                    </View>
                </View>
            </Modal>
        )
    }
}