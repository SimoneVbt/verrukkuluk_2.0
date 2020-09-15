import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Container, Button, Text, Form, Item, Label, Input, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { darkRed, white, gold } from '../resources/styles/styles';
import Head from '../components/Head';
import API from '../api/API';
import ip from '../api/ip';

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
const statusStyle = {
    backgroundColor: white,
    color: "#000",
    fontWeight: "bold",
    alignSelf: "center",
    paddingHorizontal: 30,
    paddingVertical: 10
}

export default class Login extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            wachtwoord: "",
            isLoading: false,
            result: 0
        }
    }

    _login() {

        this.setState({
            isLoading: true
        });

        let loginUrl = `http://${ ip }/verrukkuluk_2.0/api/public/index.php/api/gebruiker/login`;
        
        API.postData(loginUrl, this.state)
            .then( result => 
                console.warn("result: " + result),
                this.setState({
                    result: result,
                    isLoading: false
                })
            );

        // if (this.state.result > 0) {
        //     let userUrl = `"http://${ ip }/verrukkuluk_2.0/api/public/index.php/api/gebruiker/get/${ result }`;
            
        //     API.fetchData(userUrl, "gebruiker")
        //         .then( user => {
        //             realm.write(() => {
        //                 realm.create("gebruiker", user, true);
        //             })
        //         })
        //         .catch( err => console.warn(err) );
            
        //         this.setState({
        //             isLoading: false
        //         })
        //     //alert dat login is gelukt

        //     //Actions.MyProfile() -- bestaat ook nog niet

        // } else {
        //     // alert dat login is mislukt
        // }
    }

    _handleLoginChange(text) {
        this.setState({
            login: text
        })
    }

    _handlePasswordChange(text) {
        this.setState({
            wachtwoord: text
        })
    }

    render() {
        return(
            <Container style={{ backgroundColor: darkRed }}>
                <Head title="inloggen" login={ this.props.login } loginChange={ this.props.loginChange } />
                <ScrollView style={{ flex: 1, padding: 20, paddingRight: 30 }}>
                    { 
                        this.state.status < 0 ?
                            <Text style={ statusStyle }>Login mislukt</Text> : 
                        this.state.status > 0 ?
                            <Text style={ statusStyle }>Login geslaagd</Text> : null
                    }
                    <Form>
                        <Item stackedLabel style={ itemStyle }>
                            <Label style={ labelStyle }>Gebruikersnaam / Email</Label>
                            <Input value={ this.state.login }
                                    keyboardType="email-address"
                                    onChangeText={ (text) => this._handleLoginChange(text) }
                                    style={ inputStyle } />
                        </Item>
                        <Item stackedLabel style={ itemStyle }>
                            <Label style={ labelStyle }>Wachtwoord</Label>
                            <Input value={ this.state.wachtwoord } 
                                    secureTextEntry
                                    onChangeText={ (text) => this._handlePasswordChange(text) }
                                    style={ inputStyle } />
                        </Item>
                        <Button large  onPress={ () => this._login() }
                                style={{ alignSelf: "center", marginTop: 20, backgroundColor: white }} >
                            { this.state.isLoading ? <Spinner color={ darkRed } style={{ paddingLeft: 10 }} /> : null}
                            <Text style={{ color: darkRed, fontSize: 20 }}>
                                Inloggen!
                            </Text>
                        </Button>                            
                    </Form>
                    <Button bordered //onPress={ () => Actions.Register() } -- bestaat nog niet
                            style={{ alignSelf: "center", marginTop: 20, borderColor: white }} >
                        <Text style={{ color: white, fontSize: 15 }}>
                            Registreren
                        </Text>
                    </Button>   
                </ScrollView>
            </Container>
        )
    }

}