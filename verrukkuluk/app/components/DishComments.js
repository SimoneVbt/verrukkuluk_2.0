import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Card, CardItem, Text, View } from 'native-base';
import * as style from '../resources/styles/styles.js';
import API from '../api/API';
import NewComment from '../components/NewComment';
import Comment from '../components/Comment';


export default class DishComments extends Component
{
    state = {
        user: {},
        comments: this.props.comments,
        isLoading: false,
        error: false
    }


    componentDidMount() {
        let user = API.fetchFromDatabase("gebruiker", 1);
        this.setState({ user: user })
    }


    componentDidUpdate(prevProps) {
        if (prevProps.comments != this.props.comments) {
            this.setState({ comments: this.props.comments })
        }
    }


    renderList() {
        if (this.state.comments.length > 0) {
            return(
                <FlatList  data={ this.state.comments }
                            keyExtractor={ comm => comm.id.toString() }
                            renderItem={ ({item}) =>
                                <Comment comment={ item }
                                        user_id={ this.state.user.id }
                                        dish_id={ this.props.dish_id }
                                        loadCommentData={ this.props.loadCommentData }/>}
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
            flexDirection: "column"
        }

        return(
            <Card style={ cardStyle }>
                <CardItem style={ style.cardItemStyle }>
                    <Text style={ style.titleStyle }>Opmerkingen</Text>
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    <View style={{ height: 230, width: "100%" }}>
                        { this.renderList() }   
                    </View>
                </CardItem>
                <NewComment dish_id={ this.props.dish_id }
                            loadCommentData={ this.props.loadCommentData } />
            </Card>
        );
    }
}