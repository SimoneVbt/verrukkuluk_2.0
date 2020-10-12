import React, { Component } from 'react';
import { Modal, FlatList } from 'react-native';
import { Text, Icon, View, Button, Spinner } from 'native-base';
import * as style from '../resources/styles/styles.js';
import * as constants from '../config/constants';
import API from '../api/API';
import ShopArticle from '../components/ShopArticle';


export default class ShoppingMenu extends Component
{
    state = {
        isLoading: false,
        error: false,
        allAdded: false
    }


    addAll() {
        this.setState({ isLoading: true });
        API.postData({ url: constants.addDishToListUrl,
                        type: "post",
                        user: true,
                        data: { gerecht_id: this.props.dish_id }                 
        }).then( result =>
            this.setState({
                allAdded: true,
                isLoading: false
            })
        ).catch( error => 
            this.setState({
                isLoading: false,
                error: true
            }));
    }


    renderList() {
        return(
            <FlatList data={ this.props.ingredients }
                    keyExtractor={ article => article.id.toString() }
                    contentContainerStyle={{ marginBottom: 10 }}
                    renderItem={ ({item}) =>
                        <ShopArticle article={ item } allAdded={ this.state.allAdded } />
                    } />
        )
    }


    render() {
        const { shoppingMenuVisible } = this.props;
        return(
            <Modal visible={ shoppingMenuVisible } transparent>
                <View style={ style.overlay }>
                    <View style={ style.modalStyle }>
                        <View style={{ maxHeight: 400, width: "100%" }}>
                            <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                                <View style={{ flex: 4 }}>
                                    <Text style={ style.subtitleStyle }>
                                        Artikelen toevoegen aan boodschappenlijstje
                                    </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button transparent small iconLeft
                                            onPress={ (shoppingMenuVisible) => this.props.setShoppingMenuVisible(!shoppingMenuVisible) }>
                                        <Icon name="cross" type="Entypo" style={{ color: style.darkRed, fontSize: 40 }} />
                                    </Button>                                    
                                </View>
                            </View>
                            {/* hier misschien een bevestiging van toevoeging schrijven? */}
                            { this.renderList() }
                            <View style={{ paddingTop: 10, flexDirection: "row", justifyContent: "center" }}>
                                <Button disabled={ this.state.allAdded ? true : false }
                                        style={{ backgroundColor: this.state.allAdded ? style.green : style.darkRed,
                                                margin: 5,
                                                borderRadius: 10,
                                                width: "100%",
                                                justifyContent: "center" }}
                                        onPress={ () => this.addAll() }>
                                    {
                                        this.state.isLoading ?
                                        <Spinner color={ style.white } /> :
                                        <Text style={ style.buttonTextStyle }>
                                            { this.state.allAdded ? "artikelen toegevoegd" : "alle artikelen toevoegen" }
                                        </Text>                                        
                                    }
                                </Button>
                            </View>                            
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}