import React, {Component} from 'react';
import {Text, View} from 'react-native';

class DeckScreen extends React.Component{
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Decks"
    });
    render(){
        return (
            <View>
                <Text>Component DeckScreen</Text>
                <Text>Component DeckScreen</Text>
                <Text>Component DeckScreen</Text>
                <Text>Component DeckScreen</Text>
                <Text>Component DeckScreen</Text>
                <Text>Component DeckScreen</Text>
                <Text>Component DeckScreen</Text>                
            </View>
        )
    }
}

export default DeckScreen;