import React, { Component } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { Button, Icon, Text, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as style from '../resources/styles/styles';
import { RNCamera } from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';


export default class Camera extends Component
{
    async checkAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      
        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
          return true;
        }
      
        const status = await PermissionsAndroid.request(permission);
        return status === 'granted';
      }


    async savePicture() {
        if (this.camera) {

            if (Platform.OS === 'android') {
                await this.checkAndroidPermission();
            }

            await this.camera.takePictureAsync({ quality: 0.2, base64: true })
                .then( data => {
                    CameraRoll.save(data.uri);
                    Actions.pop({ refresh: { picture: data.uri }});
                })
                .catch( error => console.warn(error) );
          }
    }

    render() {
        return(
            <View style={{ flex: 1, backgroundColor: style.gold }}>
                <RNCamera
                    ref={ (ref) => this.camera = ref }
                    type={ RNCamera.Constants.Type.back }
                    flashMode={ RNCamera.Constants.FlashMode.auto }
                    captureAudio={false}
                    style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}
                 >
                        <Button onPress={ () => Actions.pop() }
                                style={{ backgroundColor: style.darkRed, marginTop: 10,
                                        justifyContent: "flex-start", alignItems: "center" }}>
                            <Icon name="chevron-back" type="Ionicons" style={{ color: style.white }} />
                            <Text style={{ color: style.white, marginLeft: -30 }}>
                                Terug
                            </Text>
                        </Button>
                        <Button onPress={ () => this.savePicture() }
                                style={{ backgroundColor: style.darkRed, alignSelf: "center",
                                    justifyContent: "center", marginBottom: 20,
                                        height: 100, width: 100, borderRadius: 100 / 2 }}>
                            <Text style={ style.buttonTextStyle }>
                                cheese!
                            </Text>
                        </Button>
                 </RNCamera>
            </View>
        )
    }
}