import { AsyncStorage } from 'react-native'
import { Facebook } from 'expo'

import * as types from './types'
import { FB_APP_ID } from '../keys/fb'

export const facebookLogin = () => {
	return async (dispatch) => {
		// await AsyncStorage.removeItem('fb_token')
		try {
			const token = await AsyncStorage.getItem('fb_token')
			token
				? dispatch({ type: types.FACEBOOK_LOGIN_SUCCESS, payload: token })
				: doFacebookLogin(dispatch)
		} catch (err) {
			console.log(err)
		}
	}
}

const doFacebookLogin = async (dispatch) => {
	const { token, type } = await Facebook.logInWithReadPermissionsAsync(FB_APP_ID, { permissions: ['public_profile'] })

	if (type === 'cancel') {
		return dispatch({ type: types.FACEBOOK_LOGIN_FAIL })
	}

	await AsyncStorage.setItem('fb_token', token)
	dispatch({ type: types.FACEBOOK_LOGIN_SUCCESS, payload: token })
}