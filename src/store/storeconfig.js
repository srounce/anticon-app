import { applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import rootReducer from '../reducers'
import rootEpic from '../epics'

export default initialState => [
  rootReducer,
  initialState,
  applyMiddleware(
    createEpicMiddleware(rootEpic)
  )
]
