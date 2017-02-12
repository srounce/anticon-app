import { combineReducers } from 'redux'
import geolocation from './geolocation/reducers'
import incursions from './incursions/reducers'
import zones from './zones/reducers'

const rootReducer = combineReducers({
  geolocation,
  incursions,
  zones
})

export default rootReducer
