import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createLogger from 'redux-logger'

import storeConfig from './storeconfig'


const configureStore = initialState => {
  const config = storeConfig(initialState)

  // Development mode with Redux DevTools support enabled.
  const composeEnhancers = __DEV__ ? composeWithDevTools({
    shouldHotReload: false
  }) : compose;

  const store = createStore(
    config[0],
    config[1],
    composeEnhancers(
      config[2]
      //applyMiddleware(createLogger())
    )
  )

  return store
}

export default configureStore
