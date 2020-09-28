import React, { Component } from 'react';
import { Container, Content, View, Tabs, Tab, ScrollableTab, Spinner } from 'native-base';
import * as Style from '../resources/styles/styles.js';
import * as Constants from '../config/constants';
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
        dish: [],
        isLoaded: false,
        ingredients: [],
        preparation: [],
        comments: [],
        error: false
    }

    componentDidMount() {
        const fetchDish = API.fetchFromDatabase("gerecht", `id == ${ this.props.dish_id }`);
        const fetchIngr = API.fetchData(Constants.ingrUrl + this.props.dish_id, "ingredient");
        const fetchPrep = API.fetchData(Constants.prepUrl + this.props.dish_id, "gerechtinfo");
        const fetchComm = API.fetchData(Constants.commUrl + this.props.dish_id, "gerechtinfo");

        Promise.all([fetchDish, fetchIngr, fetchPrep, fetchComm])
            .then( values => 
                this.setState({
                    isLoaded: true,
                    dish: values[0][0],
                    ingredients: values[1],
                    preparation: values[2],
                    comments: values[3]
                })
            )
            .catch( err => 
                this.setState({
                    isLoaded: true,
                    error: true
                })
            );
    }


    renderContent() {
        if (this.state.isLoaded) {
            return(
                <Tabs initialPage={0}
                    renderTabBar={ () => <ScrollableTab />}
                    tabContainerStyle={{ height: 200 }}
                    >
                    <Tab heading="omschrijving"
                        tabStyle={ Style.tabStyle } activeTabStyle={ Style.tabStyle }
                        textStyle={ Style.tabTextStyle }  activeTextStyle={ Style.tabTextStyle }>
                        <Content style={ contentStyle }>
                            <View style={{ marginBottom: 20 }}>
                                <DishDescription dish={ this.state.dish } />
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
            )
        }
        return(
            <Content contentContainerStyle={{ flex: 1, justifyContent: "center" }}>
                <Spinner color={ Style.gold } size={50} />
            </Content>
        )
    }


    render() {
        return(
            <Container style={{ backgroundColor: Style.darkRed }}>
                <Head title={ this.props.title } hasTabs />
                { this.renderContent() }
                <Foot />
            </Container>

        )
    }
}