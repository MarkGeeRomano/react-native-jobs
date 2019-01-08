import qs from 'qs'
import { FETCH_JOBS, LIKE_JOB } from './types'
import { YELP_API_KEY } from '../keys/yelp'

const JOB_ROOT_URL = 'https://api.yelp.com/v3/businesses/search?'
const OPTS = {
  mode: 'cors',
  headers: {
    "Content-Type": "application/json",
    "authorization": "Bearer " + YELP_API_KEY
  }
}

export const fetchJobs = ({ latitude, longitude }, navigation) => {
  return async (dispatch) => {
    try {
      const { businesses } = await makeFetch(latitude, longitude)
      dispatch({ type: FETCH_JOBS, payload: businesses })
      navigation.navigate('deck')
    } catch (err) {
      console.log(err)
    }
  }
}

export const likeJobs = (job) => ({ type: LIKE_JOB, payload: job })

async function makeFetch(latitude, longitude) {
  return await (await fetch(`${JOB_ROOT_URL}${qs.stringify({ latitude, longitude })}`, OPTS)).json()
}