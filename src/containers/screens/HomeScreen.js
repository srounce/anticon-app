import React, { Component } from 'react'
import {
  Alert,
  Button,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import Chance from 'chance'
import PushNotification from 'react-native-push-notification'
import MapView from 'react-native-maps'

import { connect } from 'react-redux'
const chance = new Chance()

class HomeScreen extends Component {
  //static Title = ''

  constructor(props) {
    super(props)

    this.state = {
      followUser: true
    }
  }

  componentWillReceiveProps(props) {
    if (props.currentLocation) {
      this.refs.map.animateToCoordinate(props.currentLocation, 100)
      if (props.userLocations.ids.length === 1) {
        this.refs.map.fitToElements(true)
      }
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ followUser: false }), 5000)
  }

  render() {
    const { zones, userLocations, currentLocation } = this.props
    const { followUser } = this.state
    const polyLayers = renderPolyLayers(zones)
    const userJourney = renderUserJourney(userLocations)

    const regionProps = {}
    if (currentLocation) {
      //regionProps.region = {
        //latitude: currentLocation.latitude,
        //longitude: currentLocation.longitude,
        //latitudeDelta: 0.1,
        //longitudeDelta: 0.1
      //}
    }

    return (
      <View style={[styles.container, styles.page]}>
        <MapView
          ref="map"
          {...regionProps}
          style={styles.container}
          showsUserLocation={true}
          followsUserLocation={followUser}
          onLongPress={() => console.log('onLongPress')}
          onPanDrag={() => console.log('onPanDrag')}
          onRegionChange={() => console.log('onRegionChange')}
        >
          {polyLayers}
          {userJourney}
        </MapView>
      </View>
    )
  }
}

const renderUserJourney = locations => {
  return (
    <MapView.Polyline
      coordinates={Object.values(locations)}
      strokeWidth={3}
    />
  )
}

const renderPolyLayers = layers => {
  return Object.values(layers)
    .map(layer => layer.polygons.map(r => (
      <MapView.Polygon
        key={layer.id}
        strokeWidth={0}
        strokeColor='transparent'
        fillColor={layer.color}
        coordinates={r.map(c => {
          return {
            latitude: c[0],
            longitude: c[1]
          }
        })}
      />
    )))
    .reduce((a, b) => a.concat(b), [])
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    backgroundColor: '#F5FCFF',
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
  },

  listView: {
    backgroundColor: '#FAFAFA'
  },

  rowItem: {
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    height: 72,
    padding: 12
  },
  rowItemTitle: {
    fontSize: 20,
    textAlign: 'left',
    padding: 2,
  },
  rowItemSubTitle: {
    fontSize: 14,
    textAlign: 'left',
    padding: 2,
  },
})

const mapStateToProps = (state) => {
  return {
    zones: state.zones,
    userLocations: state.geolocation.userLocations,
    currentLocation: state.geolocation.userLocations[state.currentLocation],
  }
}

const mapDispatchToProps = (dispatch) => {
  return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

