import React from 'react'
import {
  View,
  Text,
  ScrollView,
  Dimensions
} from 'react-native'
import { Button } from 'react-native-elements'

const SCREEN_WIDTH = Dimensions.get('window').width

class Slides extends React.Component {
  renderSlides = () => {
    const { data } = this.props

    return data.map((slide, i) => {
      const style = { ...styles.slideStyle, backgroundColor: slide.color }
      return (
        <View key={slide.text} style={style}>
          <Text style={styles.slideText}>{slide.text}</Text>
          {this.renderLastSlide(i === data.length - 1)}
        </View>
      )
    })
  }

  renderLastSlide = (isLastSlide) => {
    return isLastSlide && (
      <Button
        buttonStyle={styles.buttonStyle}
        title="Get jobbie"
        raised
        onPress={this.props.onComplete}
      />
    )
  }

  render() {
    return (
      <View>
        <ScrollView
          horizontal
          style={{ flex: 1 }}
          pagingEnabled
        >
          {this.renderSlides()}
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  slideText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center'
  },

  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },

  buttonStyle: {
    backgroundColor: '#0288D1',
    marginTop: 15
  }

}

export default Slides