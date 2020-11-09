import React, { Component } from 'react';
import { Alert } from 'react-native';
import { View, CardItem, Item, Input, Label, Thumbnail } from 'native-base';
import * as style from '../resources/styles/styles';
import { Picker } from '@react-native-community/picker';


export default class IngredientPicker extends Component
{
    state = {
        article_id: 0,
        amount: 0,
        picture: ""
    }

    componentDidMount() {
        if (this.props.ingr) {
            const ingr = this.props.ingr;
            let article = this.props.articles.find( article => ingr.artikel_id == article.id );
            this.setState({
                article_id: ingr.artikel_id,
                amount: ingr.aantal,
                picture: article.afbeelding
            })
        }
    }


    handleDelete() {
        this.setState({
            article_id: 0,
            amount: 0,
            picture: ""
        });
        this.props.handleDelete(this.props.number);
    }


    askForDelete() {
        Alert.alert(
            'ingrediënt verwijderen',
            `Weet je zeker dat je dit ingrediënt wil verwijderen?`,
            [
                {
                    text: 'ja',
                    onPress: () => this.handleDelete()
                },
                {
                    text: 'nee',
                    style: 'cancel'
                }
            ]
        )
    }


    handleChange(value, type) {
        if (value === 0 || value === "0") {
            this.askForDelete(value);
            return;
        }

        this.setState({ [type]: value }, () => {
            this.props.updateIngrInfo({
                number: this.props.number,
                artikel_id: this.state.article_id,
                aantal: this.state.amount
            });
            
            if (type === "article_id") {
                let article = this.props.articles.find( article => article.id == value );
                this.setState({ picture: article.afbeelding });
            }
        });
    }


    render() {
        return(
            <CardItem style={ style.cardItemStyle }>
                <View style={{ flexDirection: "row", alignItems: "center", width: "100%",  marginVertical: 5 }}>
                    <Thumbnail source={{ uri: this.state.picture || "https://www.colorbook.io/imagecreator.php?hex=ffffff&width=1080&height=1920&text=%201080x1920" }}
                                style={{ flex: 1, marginRight: 8 }}/>
                    <Item stackedLabel style={{ flex: 4, marginRight: 4 }}>
                        <Label style={ style.labelStyle }>Ingrediënt { this.props.number }</Label>
                        <Picker style={{ width: "100%" }}
                                selectedValue={ this.state.article_id }
                                onValueChange={ (value) => this.handleChange(value, "article_id") }>
                            <Picker.Item label="(artikel)" value={0} />
                            {
                                this.props.articles.map( article => {
                                    let label = `${article.naam} (${article.eenheid})`;
                                    return(
                                        <Picker.Item label={ label } value={ article.id } key={ article.id } />
                                    )
                                })
                            }
                        </Picker>
                    </Item>
                    <Item stackedLabel style={{ flex: 1, marginLeft: 5 }}>
                        <Label style={ style.labelStyle }>Aantal</Label>
                        <Input value={ this.state.amount === 0 ? null : this.state.amount.toString() }
                                onChangeText={ (value) => this.handleChange(value, "amount") }
                                keyboardType="numeric"
                        />
                    </Item>
                </View>
            </CardItem>
        )
    }
}