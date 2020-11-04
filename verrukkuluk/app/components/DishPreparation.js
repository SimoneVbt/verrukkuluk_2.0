import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Card, CardItem, Text, ListItem } from 'native-base';
import * as style from '../resources/styles/styles.js';
import API from '../api/API.js';


export default class DishPreparation extends Component
{
    state = {
        steps: []
    }
    
    componentDidMount() {
        let steps = API.fetchFromDatabase("gerechtinfo", false, `gerecht_id == ${this.props.dish_id} AND record_type = 'B'`, "nummeriekveld");
        this.setState({ steps: steps });
    }


    renderPrepStep(step, index) {
        let text = step.tekstveld.replace(/\\n/g,'\n');
        return(
            <ListItem style={{ flexDirection: "column", marginLeft: 5 }}>
                <Text style={{ color: style.darkRed, fontWeight: "bold", fontSize: 18 }}>
                    - { index + 1 } -
                </Text>
                <Text style={{ textAlign: "center" }}>
                    { text }
                </Text>
            </ListItem>
        )
    }

    render() {
        return(
            <Card style={ style.tabCardStyle }>
                <CardItem style={ style.cardItemStyle }>
                    <Text style={ style.titleStyle }>Bereiding</Text>
                </CardItem>
                <CardItem style={ style.cardItemStyle }>
                    <FlatList
                        data={ this.state.steps }
                        keyExtractor={ prep => prep.id.toString() }
                        renderItem={ ({item, index}) => this.renderPrepStep(item, index) }
                        style={{ marginBottom: 20 }}
                        />
                </CardItem>
            </Card>
        );
    }
}