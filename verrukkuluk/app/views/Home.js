import React, { Component } from 'react';
import { Container, Content, Spinner, View, Text } from 'native-base';
import { darkRed, gold, white } from '../resources/styles/styles.js';
import Head from '../components/Head';
import Foot from '../components/Foot';
import DishCard from '../components/DishCard';
import API from '../api/API';


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
        //let url = "http://192.168.0.109/verrukkuluk_2.0/api/public/index.php/api/gerecht/get_all";
        let url = "http://192.168.1.244/verrukkuluk_2.0/api/public/index.php/api/gerecht/get_all";

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
        if (this.state.isLoaded && Array.isArray(this.state.data)) {
            return(
                <View style={{ paddingBottom: 20 }}>
                    {
                        this.state.data.map( dish => {
                            return( <DishCard key={ dish.id } dish={ dish } /> );
                        })
                    }
                </View>                
            );
        } else if (this.state.isLoaded) {
            return(
                <View>
                    <Text style={{ color: white, padding: 10 }}>Er is iets mis gegaan. Vernieuw de pagina.</Text>
                </View>
            )
        }
        return(
            <View>
                <Spinner color={ gold } />
            </View>
        )
    }

    
    render() {
        return(
            <Container style={{ backgroundColor: darkRed }}>
                <Head title={ this.state.title } />
                    <Content style={{ padding: 10 }}>
                        { this._renderContent() }
                    </Content>
                <Foot />
            </Container>
        )
    }
}