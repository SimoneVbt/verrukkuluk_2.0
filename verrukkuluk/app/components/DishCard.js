import React, { Component } from 'react';
import { Card, CardItem, Text, Button, Icon, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { darkRed, beige, cardStyle, titleStyle, starStyle } from '../resources/styles/styles.js';


const buttonStyle = {
    borderColor: darkRed,
    height: 60,
    flex: 1,
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: beige
}


export default class DishCard extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.dish.id,
            title: this.props.dish.title,
            imageUri: this.props.dish.imageUri,
            type: this.props.dish.type,
            kitchen: this.props.dish.kitchen,
            description_short: this.props.dish.description_short,
            description_long: this.props.dish.description_long,
            rating: this.props.dish.rating,
            kcal: this.props.dish.kcal,
            price: this.props.dish.price
        }
    }

    render() {
        return(
            <Card style={{ paddingTop: 5, paddingBottom: 15, backgroundColor: beige }}>
                <CardItem header style={ cardStyle }>
                    <Text style={ titleStyle }>
                        { this.state.title }
                    </Text>
                </CardItem>
                <CardItem style={ cardStyle }>
                    <Thumbnail square source={{ uri: this.state.imageUri }} style={{ width: "100%", height: 100 }} />
                </CardItem>
                <CardItem style={ cardStyle }>
                    <Text style={{ fontStyle: "italic", fontSize: 14, flex: 1, color: darkRed }}>
                        { this.state.type }
                    </Text>
                    <Text style={{ fontStyle: "italic", fontSize: 14, flex: 1, color: darkRed, textAlign: "right" }}>
                        { this.state.kitchen }
                    </Text>
                </CardItem>
                <CardItem style={ cardStyle }>
                    <Text style={{ fontSize: 14 }}>
                        { this.state.description_short }
                    </Text>
                </CardItem>
                <Grid>
                    <Col>
                    <CardItem style={ cardStyle }>
                        { this.state.rating >= 1 ?
                            <Icon name="star-sharp" type="Ionicons" style={ starStyle } /> :
                            this.state.rating == 0.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ starStyle } /> }
                        { this.state.rating >= 2 ?
                            <Icon name="star-sharp" type="Ionicons" style={ starStyle } /> : 
                            this.state.rating == 1.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ starStyle } /> }
                        { this.state.rating >= 3 ?
                            <Icon name="star-sharp" type="Ionicons" style={ starStyle } /> : 
                            this.state.rating == 2.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ starStyle } /> }
                        { this.state.rating >= 4 ?
                            <Icon name="star-sharp" type="Ionicons" style={ starStyle } /> : 
                            this.state.rating == 3.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ starStyle } /> }
                        { this.state.rating == 5 ?
                            <Icon name="star-sharp" type="Ionicons" style={ starStyle } /> : 
                            this.state.rating == 4.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ starStyle } /> }
                    </CardItem>
                    <CardItem footer style={ cardStyle }>
                        <Text style={{ flex: 1, fontSize: 14, fontStyle: "italic" }}>
                            { this.state.kcal } kcal
                        </Text>
                        <Text style={{ flex: 1, fontSize: 14, fontStyle: "italic",  textAlign: "right" }}>
                            €{ this.state.price }
                        </Text>
                    </CardItem>
                    </Col>
                    <Col>
                        <CardItem style={ cardStyle }>
                            <Button rounded style={ buttonStyle } onPress={ () => Actions.Detail({ dish: this.state }) }>
                                <Text style={{ color: darkRed, fontSize: 16, fontWeight: "bold" }}>
                                    Smullen!
                                </Text>
                            </Button>
                        </CardItem>
                    </Col>
                </Grid>
            </Card>
        )
    }
}