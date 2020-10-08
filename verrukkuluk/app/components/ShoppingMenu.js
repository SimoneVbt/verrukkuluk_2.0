import React, { Component } from 'react';
import { Modal, FlatList } from 'react-native';
import { Text, Icon, View, Button, Spinner } from 'native-base';
import * as style from '../resources/styles/styles.js';
import * as constants from '../config/constants';
import API from '../api/API';
import Article from '../components/Article';


export default class ShoppingMenu extends Component
{
    state = {
        items: [],
        isLoaded: false,
        error: false
    }


    componentDidMount() {
        this.loadData();
    }


    loadData = () => {
        API.fetchData({ url: constants.listUrl, table: "boodschappen", userInUrl: true })
            .then( result => this.setState({
                items: result,
                isLoaded: true,
            }))
            .catch( error => this.setState({
                isLoaded: true,
                error: true
            }))        
    }


    renderList() {
        if (this.state.isLoaded) {
            return(
                <FlatList data={ this.state.items }
                        keyExtractor={ item => item.id.toString() }
                        contentContainerStyle={{ marginBottom: 10 }}
                        renderItem={ ({item}) =>
                            <Article item={ item } add /> } />                
            )
        }
        return(
            <Spinner color={ style.darkRed } size={50} />
        )
    }


    render() {
        const { shoppingMenuVisible } = this.props;
        return(
            <Modal visible={ shoppingMenuVisible } transparent>
                <View style={ style.overlay }>
                    <View style={ style.modalStyle }>
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
                            <Button style={ style.buttonStyle }>
                                <Text style={ style.buttonTextStyle } >
                                    alle artikelen toevoegen
                                </Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}