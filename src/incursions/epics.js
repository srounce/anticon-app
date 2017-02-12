import { combineEpics } from 'redux-observable'
import { of } from 'rxjs/observable/of'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import Polygon from 'polygon'

import { incursionEntry } from './actions'
import { LOCATION_UPDATE } from '../geolocation/actions'

export default incursionEpic = (action$, store) => action$
  .ofType(LOCATION_UPDATE)
  .map(action => {
    const { latitude, longitude } = action.payload
    const { zones } = store.getState()
    const validZones = Object.values(zones)
      .filter(v => {
        return v.polygons
          .map(v => Polygon(v))
          .some(v => v.containsPoint({x: latitude, y: longitude }))
      })

    return {
      action,
      zones: validZones
    }
  })
  .filter(v => !!v.zones.length)
  .map(v => incursionEntry(v))

