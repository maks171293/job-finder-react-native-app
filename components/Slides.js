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
                        style={{position: 'absolute', width: SCREEN_WIDTH, height: SCREEN_HEIGHT, top: 0, left: 0}}
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
        textAlign: 'center'
    },
    buttonStyle: {
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 3,
        borderStyle: 'solid',
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 60
    }
})

export default Slides;