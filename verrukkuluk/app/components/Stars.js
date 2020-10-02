import React, { Component } from 'react';
import { Icon, View } from 'native-base';
import * as style from '../resources/styles/styles.js';


export default class Stars extends Component
{
    state = {
        rating: 0
    }
    
    componentDidMount() {
        this.setRating();
    }


    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setRating();
        }
    }


    setRating() {
        let rating = this.props.type === "average" ? this.props.dish.gemiddelde_beoordeling : this.props.dish.waardering;
        this.setState({ rating: rating });          
    }


    handleRating(rating) {
        this.setState({ rating: rating });
        this.props.addRating(rating);
    }


    render() {
        let rating = this.state.rating;

        const ratingStyle =   this.props.type === "rating" ? 
                                {
                                    color: style.gold,
                                    fontSize: 40,
                                    padding: 5,
                                } :
                                {
                                    color: this.props.type === "average" ? style.darkRed : style.gold,
                                    fontSize: 28,
                                    paddingHorizontal: 1.5,
                                    paddingBottom: 2,
                                    margin: -1
                                } ;

        const disabled = this.props.type === "rating" ? false : true;

        return(
            <View style={{ flexDirection: "row", width: "100%" }}>
                <Icon name={ rating >= 1 ? "star-sharp" : rating == 0.5 ? "star-half-sharp" : "star-outline" }
                        type="Ionicons"
                        style={ ratingStyle }
                        disabled={ disabled }
                        onPress={ () => this.handleRating(1) } />
                <Icon name={ rating >= 2 ? "star-sharp" : rating == 1.5 ? "star-half-sharp" : "star-outline" }
                        type="Ionicons"
                        style={ ratingStyle }
                        disabled={ disabled }
                        onPress={ () => this.handleRating(2) } />
                <Icon name={ rating >= 3 ? "star-sharp" : rating == 2.5 ? "star-half-sharp" : "star-outline" }
                        type="Ionicons"
                        style={ ratingStyle }
                        disabled={ disabled }
                        onPress={ () => this.handleRating(3) } />
                <Icon name={ rating >= 4 ? "star-sharp" : rating == 3.5 ? "star-half-sharp" : "star-outline" }
                        type="Ionicons"
                        style={ ratingStyle }
                        disabled={ disabled }
                        onPress={ () => this.handleRating(4) } />
                <Icon name={ rating == 5 ? "star-sharp" : rating == 4.5 ? "star-half-sharp" : "star-outline" }
                        type="Ionicons"
                        style={ ratingStyle }
                        disabled={ disabled }
                        onPress={ () => this.handleRating(5) } />
            </View>
        )
    }
}