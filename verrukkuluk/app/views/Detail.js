import React, { Component } from 'react';
import { Content, Card, CardItem,
        Text, Icon, Thumbnail, View,
        Header, Tabs, Tab, ScrollableTab } from 'native-base';
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
    fontSize: 24,
    paddingLeft: 2
}
const txtStyle = {
    paddingBottom: 10
}

export default class Detail extends Component
{
    render() {
        return(
            <Content style={{ padding: 10 }}>
                <Description />
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
        )
    }
}

class Description extends Component {

    render() {
        return(
            <Card style={{ paddingTop: 5, paddingBottom: 15, backgroundColor: beige }}>
                <CardItem style={ cardStyle }>
                    <Thumbnail square source={{ uri: "https://static.ah.nl/static/recepten/img_071780_1600x_JPG.jpg" }} style={{ width: "100%", height: 150 }} />
                </CardItem>
                <CardItem style={ cardStyle }>
                    <View style={{ flexDirection: "row", flex: 2, justifyContent: "flex-start" }}>
                        <Icon name="star" type="Ionicons" style={ starStyle } />
                        <Icon name="star" type="Ionicons" style={ starStyle } />
                        <Icon name="star" type="Ionicons" style={ starStyle } />
                        <Icon name="star" type="Ionicons" style={ starStyle } />
                        <Icon name="star" type="Ionicons" style={ starStyle } />
                    </View>
                    <Text style={{ flex: 1, textAlign: "right", fontSize: 14 }}>500 kcal</Text>
                    <Text style={{ flex: 1, textAlign: "right", fontSize: 14 }}>€5,00</Text>
                </CardItem>
                <CardItem style={ cardStyle }>
                    <Text style={ titleStyle }>Pad Thai</Text>
                </CardItem>
                <CardItem style={ cardStyle }>
                    <Text style={{ fontStyle: "italic", fontSize: 14, flex: 1, color: darkRed }}>Vlees</Text>
                    <Text style={{ fontStyle: "italic", fontSize: 14, flex: 1, color: darkRed, textAlign: "right" }}>Thais</Text>
                </CardItem>
                <CardItem style={ cardStyle }>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={ txtStyle }>
                            Dit keer een veeeeeeeeel langer verhaal over Pad Thai.
                            Dit is de lange omschrijving, dus hier moet meer verteld worden dan in de korte omschrijving.
                            Dat vult ook meer regels.
                            Zelf heb ik nog nooit pad thai gegeten, dus ik kan er niet veel over vertellen. Ik heb er wel al van gehoord.
                            Als het er zo uitziet zoals op de foto, dan lijkt het me best een smakelijk gerecht.
                            Kijk, zo kan ik toch aardig wat regels voltypen zonder dat ik weer dat saaie lorem ipsum erbij moet halen :).
                            Dat is toch ook altijd maar weer hetzelfde.
                        </Text >
                        <Text style={ txtStyle }>
                            Een nieuwe alinea gaat blijkbaar in een nieuwe text-component. Dan moeten natuurlijk wel de padding en flexDirection goed staan.
                        </Text>
                    </View>
                </CardItem>
            </Card>
        )
    }
}