import React from 'react'
import { View, Text } from 'react-native'

import Slides from '../components/Slides'

class WelcomeScreen extends React.Component {
  onComplete = () => this.props.navigation.navigate('auth')

  render() {
    return (
      <View style={styles.container}>
        <Slides
          data={SLIDE_DATA}
          onComplete={this.onComplete}
        />
      </View>
    )
  }
}

const SLIDE_DATA = [
  { text: 'Welcome to job app', color: '#03A9F4' },
  { text: 'Set you location, then swipe away', color: '#009688' },
  { text: 'Go get a fucken job', color: '#03A9F4' }
]

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  }
}

export default WelcomeScreen