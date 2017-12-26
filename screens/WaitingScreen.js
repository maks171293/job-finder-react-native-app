import React, {Component} from 'react';
import {Text, View} from 'react-native';
import DeckScreen from './DeckScreen'
import AuthScreen from './AuthScreen'
import Slides from '../components/Slides'

const SLIDE_DATA = [
    {text: 'Welcome to JobApp'},
    {text: 'Use this to get Job'},
    {text: 'Set your location, then swipe away'}
]

class WaitingScreen extends React.Component{
    render(){
        return (
            <View>
                <Slides/>
            </View>
        )
    }
}

export default WaitingScreen;