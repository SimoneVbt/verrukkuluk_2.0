import React, { Component } from 'react';
import { Image, FlatList, Modal, Pressable } from 'react-native';
import { Text, View, Button, Icon } from 'native-base';
import * as style from '../resources/styles/styles';
import CameraRoll from '@react-native-community/cameraroll';


export default class PhotoMenu extends Component
{
    state = {
        photos: [],
        error: false
    }

    componentDidMount() {
        CameraRoll.getPhotos({ first: 500, assetType: 'Photos' })
            .then(r => { this.setState({ photos: r.edges }) })
            .catch( error => {
                console.warn(error);
                this.setState({ error: true })
            })
    }


    render() {
        return(
            <Modal visible={ this.props.photoMenuVisible } transparent>
                <View style={ style.overlay }>
                    <View style={ style.modalStyle }>
                        <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                            <View style={{ flex: 4 }}>
                                <Text style={ style.subtitleStyle }>
                                    Kies een foto
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Button transparent small iconLeft
                                        onPress={ () => this.props.setPhotoMenuVisible(false) }>
                                    <Icon name="cross" type="Entypo" style={{ color: style.darkRed, fontSize: 40 }} />
                                </Button>                                    
                            </View>
                        </View>
                        <FlatList 
                            data={ this.state.photos }
                            keyExtractor={ photo => photo.node.image.uri }
                            numColumns={2}
                            renderItem={ ({item, index}) =>
                                <Pressable onPress={ () => this.props.selectPictureCallback(item.node.image.uri) }>
                                    <Image key={ index }
                                            source={{ uri: item.node.image.uri }}
                                            style={{ width: 120, height: 100, margin: 5 }}
                                    />
                                </Pressable> }
                        />
                    </View>
                </View>
            </Modal>
        )
    }
}