import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { darkRed } from '../resources/styles/styles.js';
import Head from '../components/Head';
import Foot from '../components/Foot';
import DishDescription from '../components/DishDescription';


export default class Detail extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.dish.title,
            imageUri: this.props.dish.imageUri,
            type: this.props.dish.type,
            kitchen: this.props.dish.kitchen,
            description_short: this.props.dish.description_short,
            description_long: this.props.dish.description_long,
            rating: this.props.dish.rating,
            kcal: this.props.dish.kcal,
            price: this.props.dish.price
        }
    }


    render() {
        return(
            <Container style={{ backgroundColor: darkRed }}>
                <Head title={ this.state.title } login={ this.props.login } loginChange={ this.props.loginChange } />
                    <Content style={{ padding: 10 }}>
                        <DishDescription data={ this.state } />
                        {/*
                        <Header hasTabs />
                        <Tabs renderTabBar={()=> <ScrollableTab />}>
                            <Tab heading="omschrijving">
                                <Description />
                            </Tab>
                            <Tab heading="ingrediënten">
                                <Text>Hoi!</Text>
                            </Tab>
                            <Tab heading="bereiding">
                                <Text>Hoi!</Text>
                            </Tab>
                            <Tab heading="opmerkingen">
                                <Text>Hoi!</Text>
                            </Tab>
                        </Tabs> */}
                </Content>
            <Foot />
            </Container>

        )
    }
}

