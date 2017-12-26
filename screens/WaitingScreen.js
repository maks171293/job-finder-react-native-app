import React, {Component} from 'react';
import {Text, View} from 'react-native';
import DeckScreen from './DeckScreen'
import AuthScreen from './AuthScreen'
import Slides from '../components/Slides'

const SLIDE_DATA = [
    {text: 'Welcome to JobApp',
    image: 'http://eskipaper.com/images/awesome-ios-6-wallpaper-1.jpg'
},
    {text: 'Use this to get Job',
    image: 'http://eskipaper.com/images/awesome-ios-6-wallpaper-1.jpg'
},
    {text: 'Set your location, then swipe away',
    image: 'http://eskipaper.com/images/awesome-ios-6-wallpaper-1.jpg'
}
]

class WaitingScreen extends React.Component{
    onSlideComplete = () => {
        this.props.navigation.navigate('Auth')
    }
    render(){
        return (
            <View style={{flex: 1}}>
                <Slides data={SLIDE_DATA} onComplete={this.onSlideComplete}/>
            </View>
        )
    }
}

export default WaitingScreen;