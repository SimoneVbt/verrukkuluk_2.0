import React, { Component } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { Text, View, Button, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as style from '../resources/styles/styles.js';
import PhotoMenu from '../components/PhotoMenu';


export default class PhotoInterface extends Component
{
    state = {
        photoMenuVisible: false
    }

    componentDidUpdate(prevProps) {
        if (prevProps.picture != this.props.picture) {
            this.setState({ picture: this.props.picture });
            this.props.setPictureCallback(this.props.picture);
        }
    }


    async checkAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      
        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
          return true;
        }
      
        const status = await PermissionsAndroid.request(permission);
        return status === 'granted';
    }


    checkPermission(menuOrCamera, photoMenuVisible=false) {
        const action = menuOrCamera === 'camera' ?  Actions.Camera() :
                                                    this.setPhotoMenuVisible(!photoMenuVisible);
        if (Platform.OS === 'android') {
            this.checkAndroidPermission()
                .then(action)
                .catch(error => console.warn(error));            
        } else {
            action;
        }
    }


    selectPictureCallback = (imageUri) => {
        this.setState({ picture: imageUri });
        this.setPhotoMenuVisible(false);
        this.props.setPictureCallback(imageUri);
    }

    
    setPhotoMenuVisible = (bool) => {
        this.setState({ photoMenuVisible: bool })
    }


    renderPicture() {
        const { picture } = this.props;
        if (picture) {
            return(
                <Thumbnail square source={{ uri: picture }} style={{ width: "100%", height: "100%" }} />
            )
        }
        return(
            <Text style={{ textAlign: "center" }}>
                Geen afbeelding gekozen
            </Text>            
        )
    }


    render() {
        const { photoMenuVisible } = this.state;
        return(
            <View style={{ flexDirection: "column", flex: 1, alignItems: "center", marginVertical: 10 }}>
                <PhotoMenu photoMenuVisible={ photoMenuVisible }
                            setPhotoMenuVisible={ this.setPhotoMenuVisible }
                            selectPictureCallback={ this.selectPictureCallback } />
                <View style={{ borderColor: style.darkRed, borderTopWidth: 2, borderBottomWidth: 2,
                                height: 180, width: "100%", marginVertical: 5,
                                justifyContent: "center", alignItems: "center" }}>
                    { this.renderPicture() }
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                    <Button onPress={ () => this.checkPermission("camera") }
                            style={ style.buttonStyle }>
                        <Text style={ style.buttonTextStyle }>
                            Maak een foto
                        </Text>
                    </Button>
                    <Button onPress={ () => this.checkPermission("menu", photoMenuVisible) }
                            style={ style.buttonStyle }>
                        <Text style={ style.buttonTextStyle }>
                            Kies uit album
                        </Text>
                    </Button>                    
                </View>
            </View>
        )
    }
}