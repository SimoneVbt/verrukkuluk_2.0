import React, { Component } from 'react';
import { Container, Content,Text, Tabs, Tab, ScrollableTab } from 'native-base';
import { darkRed, white } from '../resources/styles/styles.js';
import Head from '../components/Head';
import Foot from '../components/Foot';
import API from '../api/API';

import DishDescription from '../components/DishDescription';
import DishIngredients from '../components/DishIngredients';
import DishPreparation from '../components/DishPreparation';
import DishComments from '../components/DishComments';

const contentStyle = {
    backgroundColor: darkRed,
    padding: 10
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
            ingredients: []
        }
    }

    componentDidMount() {
        //let urlIngredient = "http://192.168.0.109/verrukkuluk_2.0/api/public/index.php/api/ingredient/get_dish/" + this.state.dish.id;
        let urlIngredient = "http://192.168.1.244/verrukkuluk_2.0/api/public/index.php/api/ingredient/get_dish/" + this.state.dish.id;

        API.fetchData(urlIngredient, "ingredient")
            .then( data => {
                this.setState({
                    isLoaded: true,
                    ingredients: data
                })
            })
            .catch( err => {
                this.setState({
                    isLoaded: true,
                    title: "fout bij ophalen gegevens"
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
                                <DishDescription dish={ this.state.dish } />
                            </Content>
                        </Tab>
                        <Tab heading="ingrediënten"
                            tabStyle={ tabStyle } activeTabStyle={ tabStyle }
                            textStyle={ txt } activeTextStyle={ txt }>  
                            <Content style={ contentStyle }>
                                <DishIngredients dish_id={ this.state.dish.id } ingredients={ this.state.ingredients } />
                            </Content>
                        </Tab>
                        <Tab heading="bereiding"
                            tabStyle={ tabStyle } activeTabStyle={ tabStyle } 
                            textStyle={ txt } activeTextStyle={ txt }>
                            <Content style={ contentStyle }>
                                <DishPreparation />
                            </Content>
                        </Tab>
                        <Tab heading="opmerkingen"
                            tabStyle={ tabStyle } activeTabStyle={ tabStyle }
                            textStyle={ txt } activeTextStyle={ txt }>
                            <Content style={ contentStyle }>
                                <DishComments />
                            </Content>
                        </Tab>
                    </Tabs>
                <Foot />
            </Container>

        )
    }
}