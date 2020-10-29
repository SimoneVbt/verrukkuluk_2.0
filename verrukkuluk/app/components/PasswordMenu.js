import React, { Component } from 'react';
import { Modal } from 'react-native';
import { Text, Icon, View, Button, Spinner } from 'native-base';
import * as style from '../resources/styles/styles.js';
import * as constants from '../config/constants';
import Stars from '../components/Stars';
import API from '../api/API';

export default class PasswordMenu extends Component
{
    state = {
        newPassword: "",
        currentPassword: "",
        currentPassword2: "",
        differentPasswordsError: false,
        wrongPasswordError: false,
        isLoading: false,
        error: false
    }


    checkCurrentPassword() {
        if (this.state.currentPassword !== this.state.currentPassword2) {
            this.setState({ differentPasswordsError: true });
            return false;

        }
        if (this.state.currentPassword !== this.props.user.wachtwoord) {
            this.setState({ wrongPasswordError: true });
            return false;
        }

        this.setState({
            differentPasswordsError: false,
            wrongPasswordError: false
        })
        return true;
    }


    submit() {
        if (this.checkCurrentPassword) {
            //...
        }
    }


    render() {
        return(
            <Modal visible={ this.props.passwordMenuVisible } transparent>
                <View style={ style.overlay }>
                    <View style={ style.modalStyle }>
                        <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                            <View style={{ flex: 4 }}>
                                <Text style={ style.subtitleStyle }>
                                    Wachtwoord veranderen
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Button transparent small iconLeft
                                        onPress={ () => this.props.setPasswordMenuVisible(false) }>
                                    <Icon name="cross" type="Entypo" style={{ color: style.darkRed, fontSize: 40 }} />
                                </Button>                                    
                            </View>

                        {/* drie inputvelden (native base) */}
                        
                        </View>
                        {
                            this.state.isLoading && 
                            <View style={ style.overlay }>
                                <Spinner color={ style.darkRed } size={50} />
                            </View>
                        }
                    </View>
                </View>
            </Modal>
        )
    }
}