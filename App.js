import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import WaitingScreen from './screens/WaitingScreen'
import AuthScreen from './screens/AuthScreen'
import MapScreen from './screens/MapScreen'
import DeckScreen from './screens/DeckScreen'
import ReviewScreen from './screens/ReviewScreen'
import SettingsScreen from './screens/SettingsScreen'
import {Provider} from 'react-redux'
import store from './store'

class App extends React.Component {
  render() {

      const MainTab = TabNavigator({
          Map: {screen: MapScreen},
          Deck: {screen: DeckScreen},
          Review: {screen: StackNavigator({
            Review: {screen: ReviewScreen},
            Settings: {screen: SettingsScreen}
          })}
      }, {swipeEnabled: false, animationEnabled: false, tabBarPosition: "bottom"});

      const MainNavigator = TabNavigator({
        Welcome: {screen: WaitingScreen},
        Auth: {screen: AuthScreen},
        Main: {screen: MainTab}
    }, {swipeEnable: false, tabBarPosition: "bottom", lazy: true, navigationOptions: {tabBarVisible: false} })
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <MainNavigator  />
        </View>
      </Provider>
    );
  }
}

export default App;