import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { Button } from 'react-native-elements'
import { MapView } from 'expo'
import { connect } from 'react-redux'

import * as actions from '../actions'

class MapsScreen extends React.Component {
  state = {
    mapLoaded: false,
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: .04,
      latitudeDelta: .09
    }
  }

  componentDidMount = async () => {
    this.setState({ mapLoaded: true })
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region })
  }

  onPressButton = () => {
    this.props.fetchJobs(this.state.region, this.props.navigation)
  }

  render() {
    if (this.state.mapLoaded === false) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChange={this.onRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button
            large
            title='Search'
            backgroundColor='#009688'
            icon={{ name: 'search' }}
            onPress={this.onPressButton}
          />
        </View>
      </View>
    )
  }
}

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  }
}

export default connect(null, actions)(MapsScreen)