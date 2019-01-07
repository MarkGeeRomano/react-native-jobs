import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { MapView } from 'expo'
import { Card, Button } from 'react-native-elements'
import Swipe from '../components/common/Swipe'

class DeckScreen extends React.Component {
  renderCard(business) {
    return (
      <Card
        title={business.name}
      >
        <View styles={styles.detailWrapper}>
          <Text>{business.categories[0].title}</Text>
          <Text>{business.location.address1}</Text>
        </View>
        <Text>Come to this restaurant! The food is thicc and rich and hyper-good!!</Text>
      </Card>
    )
  }

  renderNoMoreCards() {
    return <Text>none more</Text>
  }

  render() {
    console.log('this.props.jobs.length', this.props.jobs)
    return(
      <View>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
        />
      </View>
    )
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
}
const mapStateToProps = ({jobs}) => ({ jobs})

export default connect(mapStateToProps)(DeckScreen)