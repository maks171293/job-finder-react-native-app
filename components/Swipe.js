import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform
} from 'react-native';
// import PropTypes from 'prop-types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_WIDTH = SCREEN_WIDTH * 0.25;
const SWIPE_TIMING_OUT = 250;

export default class Swipe extends Component {
  static defaultProps = {
    onSwipeLeft: () => {},
    onSwipeRight: () => {},
    keyProp: 'id'
  }
  constructor(props){
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: ()=>{return true},
      onPanResponderMove: (event, gesture)=>{
        position.setValue({x: gesture.dx, y: gesture.dy})
        },
      onPanResponderRelease: (event, gesture)=>{
        if(gesture.dx > SWIPE_WIDTH){
          this.forceSwipe('right')
        }else if(gesture.dx < -SWIPE_WIDTH){
          this.forceSwipe('left')
        }else{
          this.resetPosition();
        }
      }
    })

    this.state = {
      panResponder,
      position,
      index: 0
    }
  }

  componentWillUpdate(){
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring()
  }

  componentWillReceiveProps(nextProps){
    if(this.props.data !== nextProps.data){
      this.setState({index: 0})
    }
  }

  forceSwipe = (direction) => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
    Animated.timing(this.state.position, {
      toValue: {x: x, y: 0},
      duration: SWIPE_TIMING_OUT
    }).start(()=>this.onSwipeComplete(direction))
  }

  onSwipeComplete = (direction) => {
    const {onSwipeLeft, onSwipeRight, data} = this.props;
    let item = data[this.state.index];
    if(direction === 'left'){
      onSwipeLeft(item)
    }else if(direction === 'right'){
      onSwipeRight(item)
    }
    this.state.position.setValue({x: 0, y: 0})
    this.setState({index: this.state.index + 1})
  }
  resetPosition = () =>{
    Animated.spring(this.state.position, {
      toValue: {x: 0, y: 0}
    }).start()
  }

  getCardStyles = () => {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    })

    return {
      ...position.getLayout(),
      transform: [{rotate}]
    }
  }

  renderCards = () =>{
    if(this.state.index >= this.props.data.length){
      return (this.props.renderNoCards())
    }
    let deck = this.props.data.map((item, i)=>{
      if(i < this.state.index){return null}
      if(i === this.state.index){
        return(
          <Animated.View
            key={item[this.props.keyProp]}
            style={[this.getCardStyles(), styles.cardStyle, {zIndex: 10}]}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>)
      }else{
        return (
          <Animated.View
          key={item[this.props.keyProp]}
          style={[styles.cardStyle, {top: 10 * (i - this.state.index), zIndex: -i}]}>
            {this.props.renderCard(item)}
          </Animated.View>
        )
      }
    });

    return Platform.OS === 'android' ? deck : deck.reverse()
  }
  render() {
    return (
      <View style={{marginTop: 10}}>
        {this.renderCards()}
      </View>
    );
  }
}

// Swipe.propTypes = {
//     data: PropTypes.array.isRequired,
//     renderCard: PropTypes.func.isRequired,
//     renderNoCards: PropTypes.func.isRequired
// }

const styles = StyleSheet.create({
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
});
