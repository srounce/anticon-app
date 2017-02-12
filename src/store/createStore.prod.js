import { createStore } from 'redux'
import storeConfig from './storeconfig'
  

const configureStore = initialState => createStore(...storeConfig(initialState))

export default configureStore
