import React, { Component } from 'react';
import { Container, Content, Spinner } from 'native-base';
import { darkRed, gold } from '../resources/styles/styles.js';
import Head from '../components/Head';
import Foot from '../components/Foot';
import DishCard from '../components/DishCard';
import API from '../lib/API';

/*
const data = [
    {
        id: 1,
        title: "Pad Thai",
        imageUri: "https://static.ah.nl/static/recepten/img_071780_1600x_JPG.jpg",
        type: "vlees",
        kitchen: "Thais",
        description_short: "Een heel verhaal over dit gerecht. Volgens mij is het Thais, maar tot dat detail heb ik niet gekeken. Het zag er wel goed uit, dus is dit nu de dummyfoto.",
        description_long: "Dit keer een veeeeeeeeel langer verhaal over Pad Thai. \n Dit is de lange omschrijving, dus hier moet meer verteld worden dan in de korte omschrijving. \nDat vult ook meer regels. \n Zelf heb ik nog nooit pad thai gegeten, dus ik kan er niet veel over vertellen. Ik heb er wel al van gehoord. \n Als het er zo uitziet zoals op de foto, dan lijkt het me best een smakelijk gerecht. \n Kijk, zo kan ik toch aardig wat regels voltypen zonder dat ik weer dat saaie lorem ipsum erbij moet halen :). \n Dat is toch ook altijd maar weer hetzelfde. \n \n Een nieuwe alinea gaat blijkbaar in een nieuwe text-component. Dan moeten natuurlijk wel de padding en flexDirection goed staan.",
        rating: 3.5,
        kcal: 500,
        price: "5,00"
    },
    {
        id: 2,
        title: "Pad Thai 2",
        imageUri: "https://static.ah.nl/static/recepten/img_071780_1600x_JPG.jpg",
        type: "vlees 2",
        kitchen: "Thais 2",
        description_short: "Een heel verhaal over dit gerecht. Volgens mij is het Thais, maar tot dat detail heb ik niet gekeken. Het zag er wel goed uit, dus is dit nu de dummyfoto.",
        description_long: "Dit keer een veeeeeeeeel langer verhaal over Pad Thai. \n Dit is de lange omschrijving, dus hier moet meer verteld worden dan in de korte omschrijving. \nDat vult ook meer regels. \n Zelf heb ik nog nooit pad thai gegeten, dus ik kan er niet veel over vertellen. Ik heb er wel al van gehoord. \n Als het er zo uitziet zoals op de foto, dan lijkt het me best een smakelijk gerecht. \n Kijk, zo kan ik toch aardig wat regels voltypen zonder dat ik weer dat saaie lorem ipsum erbij moet halen :). \n Dat is toch ook altijd maar weer hetzelfde. \n \n Een nieuwe alinea gaat blijkbaar in een nieuwe text-component. Dan moeten natuurlijk wel de padding en flexDirection goed staan.",
        rating: 4,
        kcal: 600,
        price: "4,50"
    }
]
*/

export default class Home extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: [],
            title: "verukkuluk!nl"
        }
    }


    componentDidMount() {
        let url = "https://192.168.0.109:8000/api/gerecht/get_all";
        //let url = "http://192.168.1.244:8000/api/gerecht/get_all";

        API.fetchData(url, "gerecht")
            .then( data => {
                this.setState({
                    isLoaded: true,
                    data: data
                })
            })
            .catch( err => {
                this.setState({
                    isLoaded: true,
                    title: "fout bij ophalen gegevens"
                })
            })
    }

    
    _renderContent() {
        if (this.state.isLoaded && this.state.data.length > 0) {
            return(
                <Content style={{ padding: 10 }}>
                    {
                        this.state.data.map( dish => {
                            return(
                            <DishCard key={ dish.id }
                                    dish={ dish }
                                    login={ this.props.login }
                                    loginChange={ this.props.loginChange }
                                    /> );
                        })
                    }
                </Content>                
            );
        }
        return(
            <Content style={{ padding: 10 }}>
                <Spinner color={ gold } />
            </Content>
        )
        
    }

    
    render() {
        return(
            <Container style={{ backgroundColor: darkRed }}>
                <Head title={ this.state.title } login={ this.props.login } loginChange={ this.props.loginChange } />
                    { this._renderContent() }
                <Foot />
            </Container>
        )
    }
}