import React, { Component } from 'react';
import { Container, Content, Text, View, Card, CardItem, Form, Input, Item, Label, Button, Icon, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as style from '../resources/styles/styles';
import * as constants from '../config/constants';
import API from '../api/API.js';
import Head from '../components/Head';
import PreparationInput from '../components/PreparationInput';
import { Pressable } from 'react-native';


export default class Preparation extends Component
{
    state = {
        steps: [],
        number: 3,
        isLoaded: false,
        fetchError: false
    }

    componentDidMount() {
        API.fetchData({
            url: constants.prepUrl,
            table: "gerechtinfo",
            id: this.props.dish.id,
            filter: `gerecht_id = ${this.props.dish.id}`
        })
        .then(result =>
            this.setState({
                isLoaded: true,
                steps: result ? result : [],
                number: result.length > 0 ? result.length : 3
            })
        )
        .catch( error => {
            console.warn(error);
            this.setState({ fetchError: true });
        })
    }


    renderInputFields() {
        let steps = [];
        let i = 0;

        if (this.state.steps.length > 0) {
            for (i; i < this.state.steps.length; i++) {
                this.state.steps[i].number = i+1;
                steps.push(
                    <PreparationInput number={i+1} key={i+1}
                        step={ this.state.steps[i] }
                    />
                )
            }
        }
        for (i; i < this.state.number; i++) {
            steps.push(
                <PreparationInput number={i+1} key={i+1} />
            )  
        }
        return steps;
    }


    renderAddButton() {
        if (this.state.number < 10) {
            return(
                <CardItem style={ style.cardItemStyle }>
                    <Pressable onPress={ () => this.setState( prevState => ({ number: prevState.number + 1 })) }
                                style={{ marginVertical: 10, marginLeft: 5,
                                        flexDirection: "row", justifyContent: "center" }}>
                        <Icon name="add" type="MaterialIcons" style={{ color: style.darkRed }} />
                        <Text style={{ color: style.darkRed, fontStyle: "italic", marginTop: 2 }}>
                            Voeg extra stappen toe... (max. 10)
                        </Text>
                    </Pressable>
                </CardItem>
            )
        }
    }


    renderForm() {
        if (!this.state.isLoaded) {
            return( <Spinner color={ style.darkRed } size={50} style={{ marginVertical: 10 }} /> )
        }
        return(
            <Form>
                { this.renderInputFields() }
                { this.renderAddButton() }
                <CardItem style={ style.cardItemStyle }>
                    <Button style={ style.buttonStyle }>
                        <Text style={ style.buttonTextStyle }>
                            verzenden
                        </Text>
                    </Button>                    
                </CardItem>
            </Form>
        )
    }


    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title="bereidingsstappen" newDish />
                <Content style={{ padding: 10 }}>
                <Card style={ style.cardStyle }>
                        <CardItem style={ style.cardItemStyle }>
                            <Text style={ style.titleStyle }>
                                bereidingsstappen toevoegen
                            </Text>
                        </CardItem>
                        { this.renderForm() }
                    </Card>
                    <View style={{ padding: 10 }} />
                </Content>
            </Container>
        )
    }
}