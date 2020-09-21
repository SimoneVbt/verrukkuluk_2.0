import React, { Component } from 'react';
import { CardItem, Text, Button, Icon, Thumbnail, Grid, Col, Row } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as Style from '../resources/styles/styles.js';

const buttonStyle = {
    borderColor: Style.darkRed,
    height: 60,
    flex: 2,
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: Style.beige
}


export default class DishCardItem extends Component
{
    render() {
        return(
            <CardItem style={ Style.subCardStyle }>
                <Grid style={{ width: "100%" }}>
                    <Row style={{ paddingBottom: 10, paddingTop: 5 }}>
                        <Text style={ Style.subtitleStyle }>
                            { this.props.dish.titel }
                        </Text>                        
                    </Row>
                    <Row>
                        <Col>
                            <Thumbnail square
                                        source={{ uri: this.props.dish.afbeelding }}
                                        style={{ width: "80%", height: 80 }} />
                        </Col>
                        <Col>
                            <Text style={{ fontSize: 14 }} numberOfLines={3}>
                                { this.props.dish.korte_omschrijving }
                            </Text>
                        </Col>                        
                    </Row>
                    <Row>
                        <Button rounded
                                style={ buttonStyle }
                                onPress={ () => Actions.Detail({ dish: this.props.dish }) }>
                            <Text style={{ color: Style.darkRed, fontSize: 16, fontWeight: "bold" }}>
                                Smullen!
                            </Text>
                        </Button>
                    </Row>
                </Grid>
            </CardItem>
        )
    }
}