import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Container, View, Button, Text, Form, Item, Label, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { darkRed, white, gold } from '../resources/styles/styles';
import Head from '../components/Head';
import API from '../api/API';

const itemStyle = {
    margin: 10
}
const labelStyle = {
    color: white,
    fontStyle: "italic"
}
const inputStyle = {
    color: white
}

export default class Login extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            wachtwoord: ""
        }
    }

    _login() {
        //let loginUrl = "http://192.168.0.109/verrukkuluk_2.0/api/public/index.php/api/gebruiker/login";
        let loginUrl = "http://192.168.1.244/verrukkuluk_2.0/api/public/index.php/api/gebruiker/login";
        
        let result = API.postData(loginUrl, this.state); 

        if (result > 0) {
            //let userUrl = "http://192.168.0.109/verrukkuluk_2.0/api/public/index.php/api/gebruiker/get/" + result;
            let userUrl = "http://192.168.1.244/verrukkuluk_2.0/api/public/index.php/api/gebruiker/get/" + result;
            
            API.fetchData(userUrl, "gebruiker")
                .then( user => {
                    realm.write(() => {
                        realm.create("gebruiker", user, true);
                    })
                })
                .catch( err => console.warn(err) );
        } else {
            // alert dat login is mislukt
        }
    }

    _handleChange(event) {
        // maar: geen web-label, mobile-label! for="" ?
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    render() {
        return(
            <Container style={{ backgroundColor: darkRed }}>
                <Head title="inloggen" login={ this.props.login } loginChange={ this.props.loginChange } />
                <View style={{ flex: 1, padding: 20, paddingRight: 30 }}>
                    <ScrollView>
                        <Form>
                            <Item stackedLabel style={ itemStyle }>
                                <Label style={ labelStyle }>Gebruikersnaam / Email</Label>
                                <Input style={ inputStyle } onChange={ (event) => this._handleChange(event) } />
                            </Item>
                            <Item stackedLabel style={ itemStyle }>
                                <Label style={ labelStyle }>Wachtwoord</Label>
                                <Input style={ inputStyle } secureTextEntry onChange={ (event) => this._handleChange(event) } />
                            </Item>
                            <Button large onPress={ () => this._login() }
                                style={{ alignSelf: "center", marginTop: 20, backgroundColor: white, padding: 10 }}>
                                <Text style={{ color: darkRed, fontSize: 20 }}>
                                    Inloggen!
                                </Text>
                            </Button>                            
                        </Form>
                        <Button bordered onPress={ () => Actions.Register() } //bestaat nog niet
                            style={{ alignSelf: "center", marginTop: 20, borderColor: white }}>
                            <Text style={{ color: white, fontSize: 15 }}>
                                Registreren
                            </Text>
                        </Button>   
                    </ScrollView>
                </View>
            </Container>

        )
    }
}