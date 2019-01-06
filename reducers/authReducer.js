import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from '../actions/types'

const DEFAULT_STATE = { token: null }
export default (state, action) => {

  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { token: action.payload }
    case FACEBOOK_LOGIN_FAIL:
      return { token: null }
    default:
      return DEFAULT_STATE
  }
}