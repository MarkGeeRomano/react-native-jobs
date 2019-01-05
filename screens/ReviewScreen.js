import React from 'react'
import { View, Text, Platform } from 'react-native'
import { Button } from 'react-native-elements'

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

  render() {
    return (
      <View>
        <Text>ReviewScreen</Text>
      </View>
    )
  }
}

export default ReviewScreen