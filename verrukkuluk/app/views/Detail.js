import React, { Component } from 'react';
import { Container, Content, View, Tabs, Tab, ScrollableTab } from 'native-base';
import { darkRed, white } from '../resources/styles/styles.js';
import Head from '../components/Head';
import API from '../api/API';

import DishDescription from '../components/DishDescription';
import DishIngredients from '../components/DishIngredients';
import DishPreparation from '../components/DishPreparation';
import DishComments from '../components/DishComments';

const contentStyle = {
    backgroundColor: darkRed,
    padding: 10
}

const viewStyle = {
    backgroundColor: darkRed,
    padding: 10,
    flex: 1,
    paddingBottom: 75
}

const tabStyle = {
    backgroundColor: darkRed
}
const txt = {
    color: white
}

export default class Detail extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.dish.title,
            isLoaded: false,
            dish: this.props.dish,
            ingredients: [],
            preparation: [],
            comments: []
        }
    }

    componentDidMount() {
        // let urlIngredient = "http://192.168.0.109/verrukkuluk_2.0/api/public/index.php/api/ingredient/get_dish/" + this.state.dish.id;
        // let urlPrep = "http://192.168.0.109/verrukkuluk_2.0/api/public/index.php/api/gerechtinfo/get/B/" + this.state.dish.id;
        // let urlComm = "http://192.168.0.109/verrukkuluk_2.0/api/public/index.php/api/gerechtinfo/get/O/" + this.state.dish.id;
        let urlIngredient = "http://192.168.1.244/verrukkuluk_2.0/api/public/index.php/api/ingredient/get_dish/" + this.state.dish.id;
        let urlPrep = "http://192.168.1.244/verrukkuluk_2.0/api/public/index.php/api/gerechtinfo/get/B/" + this.state.dish.id;
        let urlComm = "http://192.168.1.244/verrukkuluk_2.0/api/public/index.php/api/gerechtinfo/get/O/" + this.state.dish.id;

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
            <Container style={{ backgroundColor: darkRed }}>
                <Head title={ this.state.title } hasTabs />
                <Tabs initialPage={0}
                    renderTabBar={()=> <ScrollableTab />}
                    tabContainerStyle={{ height: 200 }}
                    >
                    <Tab heading="omschrijving"
                        tabStyle={ tabStyle } activeTabStyle={ tabStyle }
                        textStyle={ txt }  activeTextStyle={ txt }>
                        <Content style={ contentStyle }>
                            <View style={{ marginBottom: 20 }}>
                                <DishDescription dish={ this.state.dish } />
                            </View>
                        </Content>
                    </Tab>
                    <Tab heading="ingrediënten"
                        tabStyle={ tabStyle } activeTabStyle={ tabStyle }
                        textStyle={ txt } activeTextStyle={ txt }>  
                        <View style={ viewStyle }>
                            <DishIngredients ingredients={ this.state.ingredients } />
                        </View>
                    </Tab>
                    <Tab heading="bereiding"
                        tabStyle={ tabStyle } activeTabStyle={ tabStyle } 
                        textStyle={ txt } activeTextStyle={ txt }>
                        <View style={ viewStyle }>
                            <DishPreparation preparation={ this.state.preparation } />
                        </View>
                    </Tab>
                    <Tab heading="opmerkingen"
                        tabStyle={ tabStyle } activeTabStyle={ tabStyle }
                        textStyle={ txt } activeTextStyle={ txt }>
                        <View style={ viewStyle }>
                            <DishComments comments={ this.state.comments } />
                        </View>
                    </Tab>
                </Tabs>
            </Container>

        )
    }
}