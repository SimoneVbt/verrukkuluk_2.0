import React, { Component, Fragment } from 'react';
import { Card, CardItem, Text, Button, View, Thumbnail, Icon, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-simple-toast';
import * as style from '../resources/styles/styles.js';
import * as constants from '../config/constants';
import Stars from '../components/Stars';
import API from '../api/API.js';

const buttonStyle = {
    borderColor: style.darkRed,
    height: 60,
    flex: 2,
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: style.beige
}


export default class DishCard extends Component
{
    state = {
        isLoading: false,
        error: false,
        incompleteError: false
    }


    renderTitle() {
        if (!this.props.editable) {
            return(
                <CardItem header style={ style.cardItemStyle }>
                    <Text style={ style.titleStyle }>
                        { this.props.dish.titel }
                    </Text>
                </CardItem>
            )            
        }
        return(
            <CardItem header style={ style.cardItemStyle }>
                <View style={{ flexDirection: "column", flex: 3 }}>
                    <Text style={ style.titleStyle }>
                        { this.props.dish.titel }
                    </Text>                    
                </View>
                <View style={{ flexDirection: "column", flex: 1 }}>
                    <Button transparent
                            onPress={ () => Actions.NewDish({ dish: this.props.dish }) }
                            style={{ alignSelf: "flex-end" }}>
                        <Icon name="edit" type="FontAwesome" style={{ color: style.darkRed, fontSize: 28 }} />
                    </Button>
                </View>
            </CardItem>
        )
    }


    publish(bool) {
        const { dish } = this.props;

        if (bool === true) {
            let ingredients = API.fetchDishIngredients(dish.id);
            let steps = API.fetchDishPreparation(dish.id);

            if (ingredients.length == 0 || steps.length == 0) {
                this.setState({ incompleteError: true });
                return false;
            }
        }

        this.setState({ isLoading: true, incompleteError: false }, () => {
            API.postData({
                url: constants.createDishUrl,
                type: "post",
                table: "gerecht",
                data: {
                    id: dish.id,
                    complete: bool
                }
            })
            .then( result => {
                let message = bool ? "Gerecht gepubliceerd" : "Publicatie gerecht ingetrokken";
                Toast.show(message);
                this.setState({ isLoading: false }, () => this.props.loadData());
            })
            .catch( error => {
                Toast.show("Gerecht publiceren mislukt");
                console.warn(error);
                this.setState({
                    isLoading: false,
                    error: true
                })
            })
        })
    }


    renderPublishButton() {
        let bool = false;
        let text = "Publicatie intrekken";

        if (!this.props.dish.complete) {
            bool = true;
            text = "publiceren";
        }
        return(
            <Button full
                    onPress={ () => this.publish(bool) }
                    style={ style.fullButtonStyle }>
                { this.state.isLoading && <Spinner color={ style.white } size={25} />}
                <Text style={ style.buttonTextStyle }>
                    { text }
                </Text>
            </Button>
        )
    }


    renderBottom() {
        if (this.props.editable) {
            return(
                <Fragment>
                    <CardItem style={ style.cardItemStyle }>
                        <View style={{ flex: 1 }}>
                            <Button full
                                    onPress={ () => Actions.Ingredients({ dish: this.props.dish, edit: true }) }
                                    style={ style.buttonStyle }>
                                <Icon name="food-apple-outline" type="MaterialCommunityIcons" style={{ color: style.white }} />
                                <Icon name="add" type="MaterialIcons"
                                    style={{ fontSize: 15, alignSelf: "flex-start",
                                            marginLeft: -15, marginRight: 5 }} />
                            </Button>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Button full
                                    onPress={ () => Actions.Preparation({ dish: this.props.dish, edit: true }) }
                                    style={ style.buttonStyle }>
                                <Icon name="bowl-mix-outline" type="MaterialCommunityIcons" style={{ color: style.white }} />
                                <Icon name="add" type="MaterialIcons"
                                    style={{ fontSize: 15, alignSelf: "flex-start",
                                            marginLeft: -15, marginRight: 5 }} />
                            </Button>                            
                        </View>
                    </CardItem>
                    <CardItem style={ style.cardItemStyle }>
                        { this.renderPublishButton() }
                    </CardItem>
                </Fragment>
            )
        }

    }


    renderError() {
        let text = this.state.incompleteError ? "Voor publicatie missen nog ingrediënten/bereidingsstappen" :
                    this.state.error ? "Fout bij verzenden gegevens naar server" :
                    "";

        if (text) {
            return(
                <CardItem style={ style.cardItemStyle }>
                    <Text style={ style.messageStyle }>
                        { text }
                    </Text>
                </CardItem>
            )
        }
    }
    

    render() {
        return(
            <Card style={ style.cardStyle }>
                { this.renderTitle() }
                <CardItem style={ style.cardItemStyle }>
                    <Thumbnail square
                                source={{ uri: this.props.dish.afbeelding ? this.props.dish.afbeelding : constants.defaultDish }}
                                style={{ width: "100%", height: 120 }} />
                </CardItem>
                
                { this.renderError() }
                <CardItem style={ style.cardItemStyle }>
                    <Text style={{ fontStyle: "italic", fontSize: 14, flex: 1, color: style.darkRed }}>
                        { this.props.dish.type }
                    </Text>
                    <Text style={{ fontStyle: "italic", fontSize: 14, flex: 1, color: style.darkRed, textAlign: "right" }}>
                        { this.props.dish.keuken }
                    </Text>
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    <Text style={{ fontSize: 14 }} numberOfLines={4}>
                        { this.props.dish.korte_omschrijving }
                    </Text>
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    <View style={{ flexDirection: "column" }}>
                        <View>
                            <Stars dish={ this.props.dish } type="average" />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ flex: 2, fontSize: 14, fontStyle: "italic" }}>
                                { this.props.dish.calorieen } kcal p.p.
                            </Text>
                            <Text style={{ flex: 1, fontSize: 14, fontStyle: "italic",  textAlign: "right" }}>
                                € { this.props.dish.totale_prijs }
                            </Text>
                        </View>
                    </View>
                    <View style={{ paddingLeft: 15, flexGrow: 1 }}>
                        <Button rounded
                                style={ buttonStyle }
                                onPress={ () => Actions.Detail({ dish_id: this.props.dish.id, title: this.props.dish.titel }) }>
                            <Text style={{ color: style.darkRed, fontSize: 16, fontWeight: "bold" }}>
                                Smullen!
                            </Text>
                        </Button>                        
                    </View>
                </CardItem>
                { this.renderBottom() }
            </Card>
        )
    }
}