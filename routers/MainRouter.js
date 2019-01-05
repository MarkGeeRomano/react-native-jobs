import { createBottomTabNavigator, createAppContainer } from 'react-navigation'

import ReviewRouter from './ReviewRouter'
import WelcomeScreen from '../screens/WelcomeScreen'
import AuthScreen from '../screens/AuthScreen'
import MapScreen from '../screens/MapScreen'
import DeckScreen from '../screens/DeckScreen'

const MainNavigator = createBottomTabNavigator({
  welcome: WelcomeScreen,
  auth: AuthScreen,
  main: createBottomTabNavigator({
    map: MapScreen,
    deck: DeckScreen,
    review: ReviewRouter
  })
})

export default createAppContainer(MainNavigator)