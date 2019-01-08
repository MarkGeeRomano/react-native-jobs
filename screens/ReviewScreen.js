import React from 'react'
import {
  View,
  Text,
  Platform,
  ScrollView
} from 'react-native'
import { Button, Card } from 'react-native-elements'
import { connect } from 'react-redux'

class ReviewScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Review Jobs',
    headerRight: (
      <Button
        title='Settings'
        onPress={() => navigation.navigate('settings')}
        backgroundColor='rgba(0, 0, 0, 0)'
        color='rgba(0, 122, 255, 1)'
      />
    ),
    headerStyle: { marginTop: Platform.OS === 'android' ? 20 : 0 }
  })

  renderLikedJobs() {
    return this.props.likedJobs.map(job => (
      <Card key={job.id}>
        <View style={{ height: 200 }}>
          <View>
            <Text style={styles.italics}>{job.name}</Text>
            <Text style={styles.italics}>{job.location.address1}</Text>
          </View>
        </View>
      </Card>
    ))
  }

  render() {
    return (
      <View>
        <ScrollView>
          {this.renderLikedJobs()}
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  detailWrapper: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  italics: { fontStyle: 'italic'}
}

const mapStateToProps = ({ likedJobs }) => ({ likedJobs })

export default connect(mapStateToProps)(ReviewScreen)