import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import WaitingScreen from './screens/WaitingScreen'
import AuthScreen from './screens/AuthScreen'
import MapScreen from './screens/MapScreen'
import DeckScreen from './screens/DeckScreen'
import ReviewScreen from './screens/ReviewScreen'
import SettingsScreen from './screens/SettingsScreen'

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
    }, {swipeEnable: false, tabBarPosition: "bottom", })
    return (
      <View style={{flex: 1}}>
        <MainNavigator  />
      </View>
    );
  }
}

export default App;