import React, { Component } from 'react';
import { Container, Content, View, Tabs, Tab, ScrollableTab, Spinner, Text } from 'native-base';
import * as style from '../resources/styles/styles.js';
import * as constants from '../config/constants';
import Head from '../components/Head';
import Foot from '../components/Foot';
import API from '../api/API';

import DishDescription from '../components/DishDescription';
import DishIngredients from '../components/DishIngredients';
import DishPreparation from '../components/DishPreparation';
import DishComments from '../components/DishComments';

const contentStyle = {
    backgroundColor: style.darkRed,
    padding: 10
}

const viewStyle = {
    backgroundColor: style.darkRed,
    padding: 10,
    flex: 1,
    paddingBottom: 75
}


export default class Detail extends Component
{
    state = {
        dish: [],
        isLoaded: false,
        error: false
    }

    componentDidMount() {
        const dish_id = this.props.dish_id;
        const dish = API.fetchFromDatabase("gerecht", dish_id);
        const fetchIngr = API.fetchData({ url: constants.ingrUrl, table: "ingredient", id: dish_id });
        const fetchPrep = API.fetchData({ url: constants.prepUrl, table: "gerechtinfo", id: dish_id });
        const fetchComm = API.fetchData({ url: constants.commUrl, table: "gerechtinfo", id: dish_id });

        Promise.all([fetchIngr, fetchPrep, fetchComm])
        .then( values => 
            this.setState({
                isLoaded: true,
                dish: dish
            })
        )
        .catch( error => 
            this.setState({
                isLoaded: true,
                error: true
            })
        );
    }


    loadDishData = (dish_id) => {
        let dish = API.fetchFromDatabase("gerecht", dish_id);
        this.setState({ dish: dish })
    }


    renderContent() {
        if (this.state.error) {
            return(
                <Content contentContainerStyle={{ padding: 10 }}>
                    <View style={{ padding: 15, backgroundColor: style.beige, marginTop: 5 }}>
                        <Text style={{ fontStyle: "italic" }}>
                            Fout bij ophalen gegevens
                        </Text>
                    </View>
                </Content>                
            )

        } else if (this.state.isLoaded) {
            return(
                <Tabs initialPage={0}
                    renderTabBar={ () => <ScrollableTab />}
                    tabContainerStyle={{ height: 200 }}
                    >
                    <Tab heading="omschrijving"
                        tabStyle={ style.tabStyle } activeTabStyle={ style.tabStyle }
                        textStyle={ style.tabTextStyle }  activeTextStyle={ style.tabTextStyle }>
                        <Content style={ contentStyle }>
                            <View style={{ marginBottom: 20 }}>
                                <DishDescription dish={ this.state.dish } loadDishData={ this.loadDishData } />
                            </View>
                        </Content>
                    </Tab>
                    <Tab heading="ingrediënten"
                        tabStyle={ style.tabStyle } activeTabStyle={ style.tabStyle }
                        textStyle={ style.tabTextStyle } activeTextStyle={ style.tabTextStyle }>
                        <View style={ viewStyle }>
                            <DishIngredients dish_id ={ this.state.dish.id } />
                        </View>
                    </Tab>
                    <Tab heading="bereiding"
                        tabStyle={ style.tabStyle } activeTabStyle={ style.tabStyle } 
                        textStyle={ style.tabTextStyle } activeTextStyle={ style.tabTextStyle }>
                        <View style={ viewStyle }>
                            <DishPreparation dish_id ={ this.state.dish.id } />
                        </View>
                    </Tab>
                    <Tab heading="opmerkingen"
                        tabStyle={ style.tabStyle } activeTabStyle={ style.tabStyle }
                        textStyle={ style.tabTextStyle } activeTextStyle={ style.tabTextStyle }>
                        <View style={ viewStyle }>
                            <DishComments dish_id={ this.state.dish.id } />
                        </View>
                    </Tab>
                </Tabs>                
            )
        }
        return(
            <Content contentContainerStyle={{ flex: 1, justifyContent: "center", paddingBottom: 50 }}>
                <Spinner color={ style.gold } size={60} />
            </Content>
        )
    }


    render() {
        return(
            <Container style={{ backgroundColor: style.darkRed }}>
                <Head title={ this.props.title } hasTabs />
                { this.renderContent() }
                <Foot />
            </Container>

        )
    }
}