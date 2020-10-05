import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { 
    Card, CardItem, Text, View, Spinner,
    } from 'native-base';
import * as style from '../resources/styles/styles.js';
import API from '../api/API';
import NewComment from '../components/NewComment';
import Comment from '../components/Comment';

export default class DishComments extends Component
{
    state = {
        user: {},
        isLoading: false,
        error: false
    }


    componentDidMount() {
        let user = API.fetchFromDatabase("gebruiker", 1);
        this.setState({
            user: user
        })
    }


    //probleem: door margin reageert onderkant flatlist niet op touch
    renderList() {
        if (this.props.comments.length > 0) {
            return(
                <FlatList
                    data={ this.props.comments }
                    keyExtractor={ comm => comm.id.toString() }
                    renderItem={ ({item}) => <Comment comment={ item } user_id={ this.state.user.id } /> }
                    style={{ marginBottom: 10 }}
                    />
            )
        } 
        return(
            <View style={{ paddingBottom: 15, backgroundColor: style.beige, marginTop: 5 }}>
                <Text style={{ fontStyle: "italic" }}>
                    Dit gerecht heeft nog geen opmerkingen.
                </Text>
            </View>
        )
        
    }


    render() {
        const cardStyle = {
            backgroundColor: style.beige,
            paddingTop: 5,
            paddingBottom: 5,
            marginBottom: 240,
            flexDirection: "column"
        }

        return(
            <Card style={ cardStyle }>
                <CardItem style={ style.cardItemStyle }>
                    <Text style={ style.titleStyle }>Opmerkingen</Text>
                </CardItem>
                <NewComment dish_id={ this.props.dish_id } loadCommentData={ this.props.loadCommentData } />
                <CardItem style={ style.cardItemStyle }>
                    { this.renderList() }        
                </CardItem>
            </Card>
        );
    }
}