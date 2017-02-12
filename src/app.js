/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppState,
  StyleSheet,
  View
} from 'react-native'
import color from 'color'
import Polygon from 'polygon'
import UUID from 'uuid'

import LocationService from './geolocation/LocationService'

import AppNavigator from './containers/navigation/AppNavigator'
import HomeScreen from './containers/screens/HomeScreen'

import createStore from './store/createStore'

import cczPoly from './ccz_clean.json'


const store = createStore({
  zones: [{
    id: UUID.v4(),
    title: 'Congestion charging zone',
    polygons: cczPoly.polygon,
    color: color('#ff2222').alpha(0.3).string(),
  }, {
    id: UUID.v4(),
    title: 'High location-accuracy zone',
    polygons: cczPoly.polygon.map(r => Polygon(r).scale(1.25).toArray()),
    color: color('#ffff22').alpha(0.3).string(),
  }, {
    id: UUID.v4(),
    title: 'Apple freeway simulation polygon',
    color: color('#ff2222').alpha(0.3).string(),
    polygons: [[
      [ 37.323144191740234, -122.08651542663574],
      [ 37.352078747597254, -122.08651542663574],
      [ 37.352078747597254, -122.04154014587402],
      [ 37.323144191740234, -122.04154014587402],
      [ 37.323144191740234, -122.08651542663574]
    ]]
  }].reduce((acc, v) => {
    acc[v.id] = v
    return acc
  }, {})
})

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <LocationService store={store} />
        <AppNavigator
          store={store}
          initialRoute={{
            component: HomeScreen
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

