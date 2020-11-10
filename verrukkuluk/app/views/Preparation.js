import React, { Component } from 'react';
import { Pressable } from 'react-native';
import { Container, Content, Text, View, Card, CardItem, Form, Button, Icon, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-simple-toast';
import * as style from '../resources/styles/styles';
import * as constants from '../config/constants';
import API from '../api/API.js';
import Head from '../components/Head';
import PreparationInput from '../components/PreparationInput';


export default class Preparation extends Component
{
    state = {
        steps: [],
        number: 3,
        isLoaded: false,
        fetchError: false,
        noStepsError: false,
        missingStepsError: false,
        isLoading: false,
        submitError: false
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

    submit(data) {
        API.deleteMultipleRecords("gerechtinfo", `gerecht_id = ${this.props.dish.id} AND record_type = 'B'`);
        API.postData({
            url: constants.setPrepUrl,
            type: "post",
            table: "gerechtinfo",
            data: data
        })
        .then( result => {
            Toast.showWithGravity("Bereidingsstappen toegevoegd/gewijzigd", Toast.SHORT, Toast.CENTER);
            Actions.popTo("MyDishes")
        })
        .catch( error => {
            console.warn(error);
            this.setState({
                isLoading: false,
                submitError: true
            })
        })
    }


    handleSubmit() {
        let steps = this.state.steps;
        let list = steps.filter( step => step.tekstveld != "" );

        if (list.length === 0) {
            this.setState({ noStepsError: true });
            return;
        }


        let data = [];
        for (let i = 0; i < list.length; i++) {
            data.push({
                gerecht_id: this.props.dish.id,
                record_type: "B",
                nummeriekveld: i + 1,
                tekstveld: list[i].tekstveld
            })
        }


        this.setState({
            isLoading: true,
            noStepsError: false,
            missingStepsError: false
        }, () => {

            this.submit(data);
        })
    }


    updateSteps = (obj) => {
        let steps = this.state.steps;
        let step = steps.find( step => step.number === obj.number );

        if (step) {
            step.nummeriekveld = obj.nummeriekveld;
            step.tekstveld = obj.tekstveld;
        } else {
            steps.push(obj);
        }

        this.setState({ steps: steps });
        
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
                        updateSteps={ this.updateSteps }
                    />
                )
            }
        }
        for (i; i < this.state.number; i++) {
            steps.push(
                <PreparationInput number={i+1} key={i+1}
                    updateSteps={ this.updateSteps }
                />
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

        } else if (this.state.isLoaded && !this.state.fetchError) {
            return(
                <Form>
                    { this.renderInputFields() }
                    { this.renderAddButton() }
                    <CardItem style={ style.cardItemStyle }>
                        <Button onPress={ () => this.handleSubmit() }
                                style={ style.buttonStyle }>
                            { this.state.isLoading && <Spinner color={ style.white } size={25} style={{ marginLeft: 10, marginRight: -10 }} />}
                            <Text style={ style.buttonTextStyle }>
                                verzenden
                            </Text>
                        </Button>
                    </CardItem>
                </Form>
            )
        }
    }


    renderError() {
        let text = this.state.fetchError ? "Fout bij ophalen stappen" :
                    this.state.noStepsError ? "Geen stappen om te versturen" :
                    this.state.missingStepsError ? "Laat a.u.b. geen tussenliggende stappen leeg" :
                    this.state.submitError ? "Fout bij verzenden gegevens naar de server" :
                    "";

        if (text) {
            return(
                <CardItem style={ style.cardItemStyle }>
                    <Text style={ style.messageStyle }>
                        { text }
                    </Text>
                </CardItem>
            )
        }
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
                        { this.renderError() }
                        { this.renderForm() }
                    </Card>
                    <View style={{ padding: 10 }} />
                </Content>
            </Container>
        )
    }
}