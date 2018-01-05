import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import {connect} from 'react-redux';
import Swipe from '../components/Swipe';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements'
import mapStyle from '../assets/mapStyle.json'
import * as actions from '../actions/index'

class DeckScreen extends React.Component{
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Jobs',
        tabBarIcon: ({tintColor}) => {
                return <Icon name="description" size={30} color={tintColor}/>
                }

    })

    renderCard = (job) => {
        let initialRegion = {
            latitude: job.latitude,
            longitude: job.longitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.02
        }
        return (
            <Card title="Job Info">
                <View style={{height: 300}}>
                    <MapView
                        initialRegion={initialRegion}
                        cacheEnabled={Platform.OS === 'android' ? true : false}
                        scrollEnabled={false}
                        style={{flex: 1}}
                        liteMode={true}
                        customMapStyle={mapStyle}
                        provider={MapView.PROVIDER_GOOGLE}
                    >

                    </MapView>
                </View>
                <View style={styles.detailWrapper}>
                    <Text>{job.company}</Text>
                    <Text>{job.formattedRelativeTime}</Text>                    
                </View>
                <Text style={{height: 80}}>
                    {job.snippet.replace(/<b>/g, "").replace(/<\/b>/g, "")}
                </Text>
            </Card>
        )
    }

    renderNoMoreCards = () =>{
        return (
            <Card title="No right Jobs">
                <Button
                    title="Back To Map"
                    backgroundColor="#444"
                    buttonStyle={{marginTop: 20}}
                    large
                    icon={{name: 'my-location'}}
                    onPress={()=>{this.props.navigation.navigate("Map")}}
                />
            </Card>
        )
    }

    render(){
        return (
            <View style={{backgroundColor: "#4b6878", flex: 1}}>
                <Swipe 
                    data={this.props.jobs}
                    renderCard={this.renderCard}
                    renderNoCards={this.renderNoMoreCards}
                    onSwipeRight={job => this.props.likeJob(job)}
                    keyProp="jobkey"
                />
            </View>
        )
    }
}


const mapStateToProps = ({jobs}) =>{
    return {
        jobs: jobs.results
    }
}

export default connect(mapStateToProps, actions)(DeckScreen);

const styles = StyleSheet.create({
    detailWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        marginTop: 10
    }
})