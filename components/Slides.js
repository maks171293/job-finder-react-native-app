import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, Dimensions, Image} from 'react-native';
import {Button} from 'react-native-elements'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Slides extends React.Component{

    renderLastSlide = (index) => {
        if(index === this.props.data.length - 1){
            return (
                <Button
                    title="Continue"
                    buttonStyle={styles.buttonStyle}
                    textStyle={{color: '#42b9f4'}}
                    onPress={this.props.onComplete}
                    />
            )
        }
    }

    renderSlides = () => {
        return this.props.data.map((slide, index)=>{
            return (
                <View style={styles.slideStyle} key={slide.text} >
                        <Image 
                        style={{position: 'absolute', width: SCREEN_WIDTH+6, height: SCREEN_HEIGHT, top: 0, left: -6}}
                        source={{uri: slide.image}}
                        />
                        <Text style={styles.textStyle}>
                            {slide.text}
                        </Text>
                        {this.renderLastSlide(index)}
                </View>
            )
        })
    }
    render(){
        return (
            <ScrollView
                horizontal
                pagingEnabled
                style={{flex: 1}}
            >
                {this.renderSlides()}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    slideStyle: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    textStyle: {
        fontSize: 30,
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 50,
        color: '#42b9f4'
    },
    buttonStyle: {
        backgroundColor: 'transparent',
        borderColor: '#42b9f4',
        borderWidth: 3,
        borderStyle: 'solid',
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 70,
    }
})

export default Slides;