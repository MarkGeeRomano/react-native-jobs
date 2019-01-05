import React from 'react'
import { View, YellowBox } from 'react-native'
import MainRouter from './routers/MainRouter'
import { Provider } from 'react-redux'

import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <MainRouter />
      </View>
    </Provider>
  )
}

const styles = {
  container: {
    flex: 1
  }
}

YellowBox.ignoreWarnings(['Remote debugger'])

export default App