import React, { Component } from 'react';
import { Modal } from 'react-native';
import { Text, Icon, View, Button, Spinner } from 'native-base';
import * as style from '../resources/styles/styles.js';
import * as constants from '../config/constants';
import Stars from '../components/Stars';
import API from '../api/API';

export default class RatingMenu extends Component
{
    state = {
        isLoading: false,
        error: false
    }


    addRating = (rating) => {
        this.setState({ isLoading: true });

        let data = {
            record_type: "W",
            gerecht_id: this.props.dish.id,
            nummeriekveld: rating
        }

        if (this.props.dish.waardering) { 
            data.id = this.props.dish.waardering_id
        }

        API.postData({ url: constants.addInfoUrl,
                        type: "post",
                        data: data,
                        user: true,
                        noDelete: true })
            .then(result => {
                this.setState({ isLoading: false });
                this.props.loadDishData(this.props.dish.id);
            })
            .catch(error => 
                { console.warn(error)
                this.setState({
                    isLoading: false,
                    error: true
                })})
    }

    render() {
        const { ratingMenuVisible } = this.props;
        return(
            <Modal visible={ ratingMenuVisible } transparent>
                <View style={ this.props.overlay }>
                    <View style={{ width: "80%" }}>
                        <View style={{ backgroundColor: style.beige,
                                        marginTop: 120, paddingVertical: 10, paddingHorizontal: 15,
                                        borderColor: style.darkRed, borderWidth: 2 }}>
                            <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                                <View style={{ flex: 4 }}>
                                    <Text style={ style.subtitleStyle }>
                                        Hoe vind je dit recept?
                                    </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button transparent small iconLeft
                                            onPress={ (ratingMenuVisible) => this.props.setRatingMenuVisible(!ratingMenuVisible) }>
                                        <Icon name="cross" type="Entypo" style={{ color: style.darkRed, fontSize: 40 }} />
                                    </Button>                                    
                                </View>
                            </View>
                            <View>
                                <Text>
                                    Gemiddelde beoordeling:
                                </Text>
                            </View>
                            <View style={{ paddingBottom: 10 }}>
                                <Stars dish={ this.props.dish } type="average" />
                            </View>
                            <View>
                                <View>
                                    <Text>
                                        Jouw beoordeling:
                                    </Text>
                                </View>
                                <View style={{ paddingBottom: 10 }}>
                                    <Stars dish={ this.props.dish } type="rating" addRating={ this.addRating } />
                                </View>
                                { this.state.error && 
                                    <Text style={{ fontStyle: "italic", fontSize: 15, marginTop: -10, marginBottom: 10, color: style.darkRed }}>
                                        Er is iets misgegaan bij het versturen van je beoordeling. Probeer later opnieuw.
                                    </Text>
                                }
                            </View>
                            <View>
                                <Text style={{ fontStyle: "italic", fontSize: 16 }}>
                                    Raak de ster aan die jouw beoordeling weergeeft
                                </Text>
                            </View>
                            { this.state.isLoading && 
                                <View style={ this.props.overlay }>
                                    <Spinner color={ style.darkRed } size={50} style={{ marginTop: 30 }} />
                                </View>
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}