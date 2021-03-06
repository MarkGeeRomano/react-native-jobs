import { LIKE_JOB } from '../actions/types'
import _ from 'lodash'

export default (state = [], action) => {
  switch (action.type) {
    case LIKE_JOB:
      return _.uniqBy([...state, action.payload], 'id')
    default:
      return state
  }
}