import React, {Component} from 'react';
import {Text, View, ActivityIndicator, StyleSheet} from 'react-native';
import { MapView } from 'expo';
import {Button, Icon} from 'react-native-elements'
import {connect} from 'react-redux';
import * as actions from '../actions'
import mapStyle from '../assets/mapStyle.json'

class MapScreen extends React.Component{
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Map',
        tabBarIcon: ({tintColor}) => {
                return <Icon name="my-location" size={30} color={tintColor}/>
                }

    })
    state = {
        mapLoaded: false,
        region: {
            longitude: -122,
            latitude: 37,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        }
    }

    onRegionChangeComplete = (region) => {
        this.setState({
            region
        })
    }

    onButtonPress = () => {
        this.props.fetchJobs(this.state.region, ()=>{
            this.props.navigation.navigate('Deck');
        });
    }

    componentDidMount(){
        this.setState({
            mapLoaded: true
        })
    }

    render(){
        if(!this.state.mapLoaded){
            return (
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }
        return (
            <View style={{flex: 1}}>
                <MapView 
                    region={this.state.region}
                    provider={MapView.PROVIDER_GOOGLE}
                    style={{flex: 1}}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                    customMapStyle={mapStyle}
                />          
                <View style={styles.buttonContainer}>
                    <Button
                        large
                        title="Search This Area"
                        backgroundColor="#444"
                        icon={{name: 'search'}}
                        onPress={this.onButtonPress}
                    />
                </View>      
            </View>
        )
    }
}

export default connect(null, actions)(MapScreen);

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0
    }
})