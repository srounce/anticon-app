import { combineReducers } from 'redux'

import * as ActionTypes from './actions'

const userLocations = (state = {}, action) => {
  switch(action.type) {
    case ActionTypes.LOCATION_UPDATE:
      const { payload } = action
      return {
        ...state,
        [payload.id]: payload
      }
  }

  return state
}

export const currentLocation = (state = null, action) => {
  switch(action.type) {
    case ActionTypes.LOCATION_UPDATE:
      const { payload } = action
      return payload.id
  }

  return state
}

export default combineReducers({
  currentLocation,
  userLocations
})
