import React, {Component} from 'react';
import {Text, View, Platform} from 'react-native';
import {connect} from 'react-redux'
import {clearLikedJobs} from '../actions'
import {Button} from 'react-native-elements'

class SettingsScreen extends React.Component{
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Settings",
        headerStyle: {
            marginTop: Platform.OS === 'android' ? 24 : 0,
            backgroundColor: "#4b6878",
        }
    });
    render(){
        return (
            <View style={{}}>
                <Button
                    buttonStyle={{marginTop: 20}}
                    backgroundColor="#f44336"
                    large
                    title="Reset Liked Jobs"
                    icon={{name: 'delete-forever'}}
                    onPress={this.props.clearLikedJobs}
                    />
            </View>
        )
    }
}

export default connect(null, {clearLikedJobs})(SettingsScreen);