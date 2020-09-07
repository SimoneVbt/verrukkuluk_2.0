import React, { Component } from 'react';
import {Card, CardItem, Text, Icon, Thumbnail, View} from 'native-base';
import { darkRed, beige, cardStyle, titleStyle, starStyle } from '../resources/styles/styles.js';


const txtStyle = {
    paddingBottom: 10
}


export default class DishDescription extends Component {

    render() {
        return(
            <Card style={{ paddingTop: 5, paddingBottom: 15, backgroundColor: beige }}>
                <CardItem style={ cardStyle }>
                    <Thumbnail square source={{ uri: this.props.data.imageUri }} style={{ width: "100%", height: 150 }} />
                </CardItem>
                <CardItem style={ cardStyle }>
                    <View style={{ flexDirection: "row", flex: 2, justifyContent: "flex-start" }}>
                        { this.props.data.rating >= 1 ?
                            <Icon name="star-sharp" type="Ionicons" style={ starStyle } /> :
                            this.state.rating == 0.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ starStyle } /> }
                        { this.props.data.rating >= 2 ?
                            <Icon name="star-sharp" type="Ionicons" style={ starStyle } /> : 
                            this.props.data.rating == 1.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ starStyle } /> }
                        { this.props.data.rating >= 3 ?
                            <Icon name="star-sharp" type="Ionicons" style={ starStyle } /> : 
                            this.props.data.rating == 2.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ starStyle } /> }
                        { this.props.data.rating >= 4 ?
                            <Icon name="star-sharp" type="Ionicons" style={ starStyle } /> : 
                            this.props.data.rating == 3.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ starStyle } /> }
                        { this.props.data.rating == 5 ?
                            <Icon name="star-sharp" type="Ionicons" style={ starStyle } /> : 
                            this.props.data.rating == 4.5 ?
                            <Icon name="star-half-sharp" type="Ionicons" style={ starStyle } /> :
                            <Icon name="star-outline" type="Ionicons" style={ starStyle } /> }
                    </View>
                    <Text style={{ flex: 1, textAlign: "right", fontSize: 14 }}>
                        { this.props.data.kcal } kcal
                    </Text>
                    <Text style={{ flex: 1, textAlign: "right", fontSize: 14 }}>
                        €{ this.props.data.price }
                    </Text>
                </CardItem>
                <CardItem style={ cardStyle }>
                    <Text style={ titleStyle }>
                        { this.props.data.title }
                    </Text>
                </CardItem>
                <CardItem style={ cardStyle }>
                    <Text style={{ fontStyle: "italic", fontSize: 14, flex: 1, color: darkRed }}>
                        { this.props.data.type }
                    </Text>
                    <Text style={{ fontStyle: "italic", fontSize: 14, flex: 1, color: darkRed, textAlign: "right" }}>
                        { this.props.data.kitchen }
                    </Text>
                </CardItem>
                <CardItem style={ cardStyle }>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={ txtStyle }>
                            { this.props.data.description_long }
                        </Text >
                    </View>
                </CardItem>
            </Card>
        )
    }
}