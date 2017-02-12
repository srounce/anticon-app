const { geolocation } = navigator

const DEFAULT_SETTINGS = {
  maximumAge: 30 * 1000,
  enableHighAccuracy: false
}


class LocationMonitor {
  constructor(options) {
    this._settings = {
      ...DEFAULT_SETTINGS,
      ...options
    }
    this._locationWatchId = null
    this._subscribers = []
  }

  setOptions(options) {
    let needsRestart = false

    if (this.isRunning) {
      needsRestart = true
      this.stop()
    }

    this._setOptions(options)

    if (needsRestart) this.start()
  }

  get isRunning() { return this._isRunning }

  start(options) {
    this._setOptions(options);

    this._locationWatchId = geolocation.watchPosition(
      ev => this._onPositionUpdate(ev),
      e => this._onPositionFailure(e),
      this._settings
    )

    this._isRunning = true
  }

  stop() {
    geolocation.clearWatch(this._locationWatchId)
    this._isRunning = true
  }

  subscribe(fn) {
    const subscribers = this._subscribers
    const index = subscribers.indexOf(fn)

    if (index === -1) subscribers.push(fn)

    return { stop: () => subscribers.slice(index, 1) }
  }

  _setOptions(options = {}) {
    this._settings = {
      ...DEFAULT_SETTINGS,
      ...this._settings,
      ...options
    }
  }

  _onPositionUpdate(ev) {
    this._subscribers.map(s => setTimeout(() => s(ev, null), 0))
  }

  _onPositionFailure(e) {
    this._subscribers.map(s => setTimeout(() => s(null, e), 0))
  }
}

export default LocationMonitor
