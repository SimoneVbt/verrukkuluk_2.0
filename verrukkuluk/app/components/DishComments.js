import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Card, CardItem, Text, View } from 'native-base';
import * as style from '../resources/styles/styles.js';
import * as constants from '../config/constants';
import API from '../api/API';
import NewComment from '../components/NewComment';
import Comment from '../components/Comment';


export default class DishComments extends Component
{
    state = {
        user: {},
        comments: [],
        isLoading: false,
        error: false
    }


    componentDidMount() {
        let user = API.fetchUser();
        let comments = API.fetchDishComments(this.props.dish_id);
        this.setState({ 
            user: user,
            comments: comments
        })
    }


    getCommentsInfo() {
        API.fetchData({ url: constants.commUrl, table: "gerechtinfo", id: this.props.dish_id })
        .then( result => this.setState({ comments: result }) )
        .catch( error => console.warn(error) );
    }
    

    handleSubmit = (data) => new Promise( (resolve, reject) => {
        API.postData({
            url: constants.addInfoUrl,
            type: "post",
            table: "gerechtinfo",
            data: data,
            user: true,
            edit: true
        })
        .then( result => {
            this.getCommentsInfo();
            resolve(result);
        })
        .catch( error => {
            console.warn(error);
            reject(error);
        })
    })


    handleDelete = (comment) => {
        const id = comment.id;
        API.postData({
            url: constants.deleteInfoUrl,
            table: "gerechtinfo",
            type: "delete",
            id: id
        })
        .then( result => this.getCommentsInfo() )
        .catch( error => console.warn(error) )
    }


    renderList() {
        if (this.state.comments.length > 0) {
            return(
                <FlatList data={ this.state.comments }
                        keyExtractor={ comm => comm.id.toString() }
                        renderItem={ ({item}) =>
                            <Comment comment={ item }
                                    user_id={ this.state.user.remote_id }
                                    dish_id={ this.props.dish_id }
                                    handleSubmit={ this.handleSubmit }
                                    handleDelete={ this.handleDelete }/>
                            
                        }
                        persistentScrollbar
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
                <NewComment dish_id={ this.props.dish_id } handleSubmit={ this.handleSubmit } />
            </Card>
        );
    }
}