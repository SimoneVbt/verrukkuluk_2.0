import React, { Component } from 'react';
import { Container, Content, View, Tabs, Tab, ScrollableTab } from 'native-base';
import * as Style from '../resources/styles/styles.js';
import { baseUrl } from '../config/constants';
import Head from '../components/Head';
import Foot from '../components/Foot';
import API from '../api/API';

import DishDescription from '../components/DishDescription';
import DishIngredients from '../components/DishIngredients';
import DishPreparation from '../components/DishPreparation';
import DishComments from '../components/DishComments';

const contentStyle = {
    backgroundColor: Style.darkRed,
    padding: 10
}

const viewStyle = {
    backgroundColor: Style.darkRed,
    padding: 10,
    flex: 1,
    paddingBottom: 75
}


export default class Detail extends Component
{
    state = {
        title: this.props.dish.titel,
        isLoaded: false,
        ingredients: [],
        preparation: [],
        comments: []
    }

    componentDidMount() {
        let urlIngredient = baseUrl + `ingredient/get/${ this.props.dish.id }`;
        let urlPrep = baseUrl + `gerechtinfo/get/B/${ this.props.dish.id }`;
        let urlComm = baseUrl + `gerechtinfo/get/O/${ this.props.dish.id }`;

        API.fetchData(urlIngredient, "ingredient")
            .then( data => {
                this.setState({ ingredients: data })
            })
            .catch( err => {
                this.setState({ title: "fout bij ophalen gegevens" })
            })
            .then(() => {
                
                API.fetchData(urlPrep, "gerechtinfo")
                    .then( data => {
                        this.setState({ preparation: data })
                    })
                    .catch( err => {
                        this.setState({ title: "fout bij ophalen gegevens" })
                    })
                    .then(() => {

                        API.fetchData(urlComm, "gerechtinfo")
                            .then( data => {
                                this.setState({
                                    isLoaded: true,
                                    comments: data
                                })
                            })
                            .catch( err => {
                                this.setState({
                                    isLoaded: true,
                                    title: "fout bij ophalen gegevens"
                                })
                            })
                    })
            })
    }


    render() {
        return(
            <Container style={{ backgroundColor: Style.darkRed }}>
                <Head title={ this.state.title } hasTabs />
                <Tabs initialPage={0}
                    renderTabBar={ () => <ScrollableTab />}
                    tabContainerStyle={{ height: 200 }}
                    >
                    <Tab heading="omschrijving"
                        tabStyle={ Style.tabStyle } activeTabStyle={ Style.tabStyle }
                        textStyle={ Style.tabTextStyle }  activeTextStyle={ Style.tabTextStyle }>
                        <Content style={ contentStyle }>
                            <View style={{ marginBottom: 20 }}>
                                <DishDescription dish={ this.props.dish } />
                            </View>
                        </Content>
                    </Tab>
                    <Tab heading="ingrediënten"
                        tabStyle={ Style.tabStyle } activeTabStyle={ Style.tabStyle }
                        textStyle={ Style.tabTextStyle } activeTextStyle={ Style.tabTextStyle }>  
                        <View style={ viewStyle }>
                            <DishIngredients ingredients={ this.state.ingredients } />
                        </View>
                    </Tab>
                    <Tab heading="bereiding"
                        tabStyle={ Style.tabStyle } activeTabStyle={ Style.tabStyle } 
                        textStyle={ Style.tabTextStyle } activeTextStyle={ Style.tabTextStyle }>
                        <View style={ viewStyle }>
                            <DishPreparation preparation={ this.state.preparation } />
                        </View>
                    </Tab>
                    <Tab heading="opmerkingen"
                        tabStyle={ Style.tabStyle } activeTabStyle={ Style.tabStyle }
                        textStyle={ Style.tabTextStyle } activeTextStyle={ Style.tabTextStyle }>
                        <View style={ viewStyle }>
                            <DishComments comments={ this.state.comments } />
                        </View>
                    </Tab>
                </Tabs>
                <Foot />
            </Container>

        )
    }
}