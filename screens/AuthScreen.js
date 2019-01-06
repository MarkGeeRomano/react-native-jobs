import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

import * as actions from '../actions'

class AuthScreen extends React.Component {
  componentDidMount = () => {
    this.props.facebookLogin()
    this.onAuthComplete(this.props)
  }

  componentWillReceiveProps = (nextProps) => this.onAuthComplete(nextProps)
  
  onAuthComplete = (props) => props.token && this.props.navigation.navigate('map')

  render() {
    return (
      <View>
        <Text>Auth screen</Text>
      </View>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ token: auth.token })

export default connect(mapStateToProps, actions)(AuthScreen)