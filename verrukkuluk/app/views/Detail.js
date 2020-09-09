import React, { Component } from 'react';
import { Container, Content,Text, Tabs, Tab, ScrollableTab } from 'native-base';
import { darkRed, white } from '../resources/styles/styles.js';
import Head from '../components/Head';
import Foot from '../components/Foot';
import DishDescription from '../components/DishDescription';

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
    render() {
        return(
            <Container style={{ backgroundColor: darkRed }}>
                <Head title={ this.props.dish.title } login={ this.props.login } loginChange={ this.props.loginChange } hasTabs />
                    <Tabs initialPage={0} renderTabBar={()=> <ScrollableTab />}
                        tabContainerStyle={{ height: 200 }}
                        >
                        <Tab heading="omschrijving" tabStyle={ tabStyle } activeTabStyle={ tabStyle }
                                                    textStyle={ txt }  activeTextStyle={ txt }>
                            <Content style={ contentStyle }>
                                <DishDescription dish={ this.props.dish } />
                            </Content>
                        </Tab>
                        <Tab heading="ingrediënten" tabStyle={ tabStyle } activeTabStyle={ tabStyle }
                                                    textStyle={ txt } activeTextStyle={ txt }>  
                            <Content style={ contentStyle }>
                                <Text>Hoi!</Text>
                            </Content>
                        </Tab>
                        <Tab heading="bereiding" tabStyle={ tabStyle } activeTabStyle={ tabStyle } 
                                                    textStyle={ txt } activeTextStyle={ txt }>
                            <Content style={ contentStyle }>
                                <Text>Hoi!</Text>
                            </Content>
                        </Tab>
                        <Tab heading="opmerkingen" tabStyle={ tabStyle } activeTabStyle={ tabStyle }
                                                    textStyle={ txt } activeTextStyle={ txt }>
                            <Content style={ contentStyle }>
                                <Text>Hoi!</Text>
                            </Content>
                        </Tab>
                    </Tabs>
            <Foot />
            </Container>

        )
    }
}

