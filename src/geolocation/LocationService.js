import React, { Component } from 'react'
import {
  View
} from 'react-native'

import UUID from 'uuid'
import LocationMonitor from './LocationMonitor'
import * as Actions from './actions'

class LocationService extends Component {
  constructor(props) {
    super(props)

    this.monitor = new LocationMonitor()
    this.monitor.subscribe((...args) => this._onPositionUpdate(...args))

    this.state = { }
  }

  componentDidMount() {
    this.monitor.start()
  }

  componentWillUnmount() {
    this.monitor.stop()
  }

  _onPositionUpdate(ev, err) {
    if (err) return //console.warn(`${err.toString()}\n${JSON.stringify(err, null, 2)}`);

    const { store } = this.props
    const { timestamp } = ev

    store.dispatch(Actions.updateLocation({
      id: UUID.v4(),
      timestamp: new Date(timestamp),
      ...ev.coords
    }))
  }

  render() {
    return null
  }
}

export default LocationService
