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
        error: false,
        user: {}
    }


    componentDidMount() {
        let user = API.fetchFromDatabase("gebruiker", 1);
        this.setState({ user: user });
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


    renderRatingStars() {
        if (this.state.user.remote_id != this.props.dish.gebruiker_id) {
            return(
                <View>
                    <View>
                        <Text>
                            Jouw beoordeling:
                        </Text>
                    </View>
                    <View style={{ paddingBottom: 10 }}>
                        <Stars dish={ this.props.dish } type="rating" addRating={ this.addRating } />
                    </View>
                    { 
                        this.state.error && 
                        <Text style={{ fontStyle: "italic", fontSize: 15, marginTop: -10, marginBottom: 10, color: style.darkRed }}>
                            Er is iets misgegaan bij het versturen van je beoordeling. Probeer later opnieuw.
                        </Text>
                    }
                    <Text style={{ fontStyle: "italic", fontSize: 16 }}>
                        Raak de ster aan die jouw beoordeling weergeeft
                    </Text>
                </View>
            )
        }
        return(
            <Text style={{ fontStyle: "italic" }}>
                Je kunt je eigen gerechten niet beoordelen.
            </Text>
        )
    }


    render() {
        return(
            <Modal visible={ this.props.ratingMenuVisible } transparent>
                <View style={ style.overlay }>
                    <View style={ style.modalStyle }>
                        <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                            <View style={{ flex: 4 }}>
                                <Text style={ style.subtitleStyle }>
                                    Hoe vind je dit recept?
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Button transparent small iconLeft
                                        onPress={ () => this.props.setRatingMenuVisible(false) }>
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
                        { this.renderRatingStars() }
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