import { combineEpics } from 'redux-observable'

import incursionEpic from './incursions/epics'

export default combineEpics(
  incursionEpic
)
