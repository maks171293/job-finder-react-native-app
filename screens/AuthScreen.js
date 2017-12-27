import React, {Component} from 'react';
import {Text, View, AsyncStorage} from 'react-native';
import * as actions from '../actions';
import {connect} from 'react-redux';

class AuthScreen extends React.Component{
    componentDidMount(){
        this.props.facebookLogin();
        this.onAuthComplete(this.props)
    }

    componentWillReceiveProps(nextProps){
        this.onAuthComplete(nextProps)
    }

    onAuthComplete = (props) => {
        if(props.token){
            this.props.navigation.navigate('Map');
        }
    }

    render(){
        return (
            <View/>
        )
    }
}

function mapStateToProps({auth}){
    return {token: auth.token}
}

export default connect(mapStateToProps, actions)(AuthScreen);