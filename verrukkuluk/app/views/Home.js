import React, { Component } from 'react';
import { Content, Card, CardItem, Text, Button, Icon, Thumbnail, Grid, Row, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { darkRed, beige } from '../resources/styles/styles.js';

const cardStyle = {
    backgroundColor: beige,
    paddingTop: 10,
    paddingBottom: 0,
    flexDirection: "row"
}
const titleStyle = {
    color: darkRed,
    textTransform: "uppercase",
    fontSize: 20,
    fontWeight: "bold"
}
const starStyle = {
    color: darkRed,
    paddingLeft: 1,
    paddingBottom: 5,
    margin: -1
}
const buttonStyle = {
    borderColor: darkRed,
    height: 60,
    flex: 1,
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: beige
}


export default class Home extends Component
{
    componentDidMount() {
        //let url = "http://192.168.0.109/.../api/gerecht/get_all";
    }

    render() {

        return(
            <Content style={{ padding: 10 }}>
                <Card style={{ paddingTop: 5, paddingBottom: 15, backgroundColor: beige }}>
                    <CardItem header style={ cardStyle }>
                        <Text style={ titleStyle }>Pad Thai</Text>
                    </CardItem>
                    <CardItem style={ cardStyle }>
                        <Thumbnail square source={{ uri: "https://static.ah.nl/static/recepten/img_071780_1600x_JPG.jpg" }} style={{ width: "100%", height: 100 }} />
                    </CardItem>
                    <CardItem style={ cardStyle }>
                        <Text style={{ fontStyle: "italic", fontSize: 14, flex: 1, color: darkRed }}>Vlees</Text>
                        <Text style={{ fontStyle: "italic", fontSize: 14, flex: 1, color: darkRed, textAlign: "right" }}>Thais</Text>
                    </CardItem>
                    <CardItem style={ cardStyle }>
                        <Text style={{ fontSize: 14 }}>
                            Een heel verhaal over dit gerecht. Volgens mij is het Thais, maar tot dat detail heb ik niet gekeken. Het zag er wel goed uit, dus is dit nu de dummyfoto.
                        </Text>
                    </CardItem>
                    <Grid>
                        <Col>
                         <CardItem style={ cardStyle }>
                            <Icon name="star" type="Ionicons" style={ starStyle } />
                            <Icon name="star" type="Ionicons" style={ starStyle } />
                            <Icon name="star" type="Ionicons" style={ starStyle } />
                            <Icon name="star" type="Ionicons" style={ starStyle } />
                            <Icon name="star" type="Ionicons" style={ starStyle } />
                        </CardItem>
                        <CardItem footer style={ cardStyle }>
                            <Text style={{ flex: 1, fontSize: 14, fontStyle: "italic" }}>500 kcal</Text>
                            <Text style={{ flex: 1, fontSize: 14, fontStyle: "italic",  textAlign: "right" }}>€5,00</Text>

                        </CardItem>
                        </Col>
                        <Col>
                            <CardItem style={ cardStyle }>
                                <Button rounded style={ buttonStyle } onPress={ () => Actions.detail() }>
                                    <Text style={{ color: darkRed, fontSize: 16, fontWeight: "bold" }}>Smullen!</Text>
                                </Button>
                            </CardItem>
                        </Col>
                    </Grid>
                   
                </Card>
            </Content>
        )
    }

}