import React, {Component} from 'react';
import {Text, View, Platform, ScrollView, StyleSheet, Linking} from 'react-native';
import {Button, Card, Icon} from 'react-native-elements';
import {connect} from 'react-redux'
import {MapView} from 'expo'
import mapStyle from '../assets/mapStyle.json'


class ReviewScreen extends React.Component{
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Review Jobs",
        headerRight: <Button 
            title="Settings" 
            onPress={()=>{navigation.navigate('Settings')}}
            backgroundColor="rgba(0,0,0,0)"
            color="rgba(0,122,255,1)"
            />,
        tabBarIcon: ({tintColor}) => {
           return <Icon name="favorite" size={30} color={tintColor}/>
        },
        headerStyle: {
            marginTop: Platform.OS === 'android' ? 24 : 0,
            backgroundColor: '#444'
        }
    });

    renderLikedJobs = () => {
        return this.props.likedJobs.map(job=>{
            let initialRegion = {
                latitude: job.latitude,
                longitude: job.longitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02
            }
            return (
                <Card title={job.jobtitle} key={job.jobkey}>
                    <View style={{height: 200}}>
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
                        <View style={styles.deetailWrapper}>
                            <Text style={styles.italics}>{job.company}</Text>
                            <Text style={styles.italics}>{job.formattedRelativeTime}</Text>                        
                        </View>
                        <Button
                            buttonStyle={{marginTop: 10}}
                            title="Apply Now"
                            backgroundColor="#444"
                            onPress={()=>Linking.openURL(job.url)}
                        />
                    </View>
                </Card>
            )
        })
    }

    render(){
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#4b6878'}}>
                {this.renderLikedJobs()}
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        likedJobs: state.likedJobs
    }
}

export default connect(mapStateToProps)(ReviewScreen);


const styles = StyleSheet.create({
    deetailWrapper: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    italics: {
        fontStyle: 'italic'
    }
})