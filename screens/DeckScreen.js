import React from 'react'
import { View, Text, Platform } from 'react-native'
import { connect } from 'react-redux'
import { MapView } from 'expo'
import { Card, Button } from 'react-native-elements'
import Swipe from '../components/common/Swipe'
import * as actions from '../actions'

class DeckScreen extends React.Component {
  renderCard(business) {
    const { coordinates } = business
    const initialRegion = {
      longitude: coordinates.longitude,
      latitude: coordinates.latitude,
      longitudeDelta: .01,
      latitudeDelta: .01
    }

    return (
      <Card
        style={{ flex: 1 }}
        title={business.name}
        scrollEnabled={false}
      >
        <View style={{ height: 300 }}>
          <MapView
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android'}
            scrollEnabled={false}
            initialRegion={initialRegion}
          >
            <MapView.Marker coordinate={initialRegion} />
          </MapView>
        </View>
        <View style={styles.detailWrapper}>
          <Text>{business.categories[0].title}</Text>
          <Text>{business.location.address1}</Text>
        </View>
        <Text>Come to this restaurant! The food is thicc and rich and hyper-good!!</Text>
      </Card>
    )
  }

  renderNoMoreCards = () => <Card title='No more cards!' />

  render() {
    return (
      <View style={{ marginTop: 80 }}>
        <Swipe
          data={this.props.jobs.slice(0, 10)}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={this.props.likeJobs}
        />
      </View>
    )
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  }
}

const mapStateToProps = ({ jobs }) => ({ jobs })

export default connect(mapStateToProps, actions)(DeckScreen)