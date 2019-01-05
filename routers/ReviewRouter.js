import { createStackNavigator } from 'react-navigation'

import ReviewScreen from '../screens/ReviewScreen'
import SettingsScreen from '../screens/SettingsScreen'

const ReviewNavigator = createStackNavigator({ review: ReviewScreen, settings: SettingsScreen })

export default ReviewNavigator