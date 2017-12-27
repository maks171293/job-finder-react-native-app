import React, {Component} from 'react';
import {Text, View, AsyncStorage} from 'react-native';
import DeckScreen from './DeckScreen'
import AuthScreen from './AuthScreen'
import {AppLoading} from 'expo'
import Slides from '../components/Slides'

const SLIDE_DATA = [
    {text: 'Welcome to JobApp',
    image: 'http://thecontextofthings.com/wp-content/uploads/2015/06/simple-design-wallpaper-14_195792-1600x1200.jpg'
},
    {text: 'Use this to get Job',
    image: 'http://thecontextofthings.com/wp-content/uploads/2015/06/simple-design-wallpaper-14_195792-1600x1200.jpg'
},
    {text: 'Set your location, then swipe away',
    image: 'http://thecontextofthings.com/wp-content/uploads/2015/06/simple-design-wallpaper-14_195792-1600x1200.jpg'
}
]

class WaitingScreen extends React.Component{
    state = {
        token: null
    }
    onSlideComplete = () => {
        this.props.navigation.navigate('Auth')
    }
    async componentWillMount(){
        let token = await AsyncStorage.getItem('fb_token');
        if(token){
            this.props.navigation.navigate('Map');
            this.setState({token})
        }else{
            this.setState({token: false})
        }
    }
    render(){
        if(this.state.token === null){
            return <AppLoading/>
        }

        return (
            <View style={{flex: 1}}>
                <Slides data={SLIDE_DATA} onComplete={this.onSlideComplete}/>
            </View>
        )
    }
}

export default WaitingScreen;