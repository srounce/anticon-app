import url from 'url'
import { normalize, schema as Schema } from 'normalizr'
import { camelizeKeys } from 'humps'

import invariant from 'fbjs/lib/invariant'

export const API_ROOT = 'https://example.net'

export const API_CALL = Symbol('API_CALL')

const actionForwarder = action => data => {
  const transformed = Object.assign({}, action, data)
  delete transformed[API_CALL]
  return transformed
}

const api = (endpoint, payload, schema) => {
  return fetch(url.resolve(API_ROOT, endpoint))
    .then(res => res.json())
    .then(json => {
      const camelizedJson = camelizeKeys(json)
      return Object.assign({},
        normalize(camelizedJson, schema)
      )
    })
}

const stuffSchema = new Schema.Entity('stuff', {}, {
  idAttribute: s => s.id
})

export const Schemas = {
  STUFF: stuffSchema,
  STUFF_ARRAY: [stuffSchema],
}

export default store => next => action => {
  const apiCall = action[API_CALL]
  const { types, payload, schema } = apiCall

  let { endpoint } = apiCall

  if (typeof apiCall === 'undefined')
    return next(action)

  if (typeof endpoint === 'function')
    endpoint = endpoint(store.getState())

  invariant(
    typeof endpoint === 'string',
    'Endpoint URL must be a string'
  )

  const actionWith = actionForwarder(action)

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))
  
  return api(endpoint, payload, schema)
    .then(
      response => next(actionWith({
        response,
        type: successType
      })),
      error => next(actionWith({
        type: failureType,
        error: error.message || `API call to '${endpoint}' failed`
      }))
    )
}
