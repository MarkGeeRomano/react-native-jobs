import React from 'react'
import { View, AsyncStorage } from 'react-native'
import { AppLoading } from 'expo'
import _ from 'lodash'

import Slides from '../components/Slides'

class WelcomeScreen extends React.Component {
  state = { token: null }

  onComplete = () => this.props.navigation.navigate('auth')

  componentWillMount = async () => {
    const token = await AsyncStorage.getItem('fb_token')
    token
      ? this.props.navigation.navigate('map')
      : this.setState({ token: false })
  }

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />
    }

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