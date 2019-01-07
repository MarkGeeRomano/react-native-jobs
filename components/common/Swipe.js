import React from 'react'
import {
  View,
  PanResponder,
  Animated,
  Dimensions,
  LayoutAnimation,
  UIManager
} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = .25 * SCREEN_WIDTH
const SWIPE_OUT_DURATION = 250

class Deck extends React.Component {
  static defaultProps = {
    onSwipeRight: () => { },
    onSwipeLeft: () => { }
  }

  constructor() {
    super()

    const position = new Animated.ValueXY()
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) =>
        position.setValue({ x: gesture.dx, y: gesture.dy }),
      onPanResponderRelease: (e, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right')
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe()
        } else {
          this.resetPosition()
        }
      }
    })

    this.state = { panResponder, position, index: 0 }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== this.props.data) {
      this.setState({ index: 0 })
    }
  }

  componentWillUpdate() {
    //for android
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    LayoutAnimation.spring()
  }

  getCardStyle() {
    const { position } = this.state

    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    })

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    }
  }

  resetPosition() {
    const toValue = { toValue: { x: 0, y: 0 } }
    Animated.spring(this.state.position, toValue).start()
  }

  forceSwipe(direction) {
    const opts = {
      duration: SWIPE_OUT_DURATION,
      toValue: {
        x: direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH,
        y: 0
      }
    }
    Animated.timing(this.state.position, opts)
      .start(() => this.onSwipeComplete(direction))
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props
    const { index, position } = this.state
    const item = data[index]

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item)
    position.setValue({ x: 0, y: 0 })
    this.setState({ index: index + 1 })
  }

  renderCards() {
    if (this.props.data.length === this.state.index) {
      return this.props.renderNoMoreCards()
    }

    return this.props.data.map((item, i) => {
      if (i < this.state.index) {
        return null
      } else if (i === this.state.index) {
        return (
          <Animated.View
            key={item.id}
            style={[this.getCardStyle(), styles.cardStyle]}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </ Animated.View>
        )
      } else {
        return (
          <Animated.View
            key={item.id}
            style={{
              ...styles.cardStyle,
              top: 10 * (i - this.state.index)
            }}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        )
      }
    }).reverse()
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    )
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
}

export default Deck