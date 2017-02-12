import React, { Component } from 'react'
import {
  Navigator,
  View
} from 'react-native'
import { Provider } from 'react-redux';

import NavigationBarRouteMapper from './NavBarRouteMapper'

const DEFAULT_TRANSITION = Navigator.SceneConfigs.PushFromRight

export default class AppNavigator extends Component {
  constructor(props) {
    super(props)

    this.renderScene = this.renderScene.bind(this)
    this.configureScene = this.configureScene.bind(this)
  }

  configureScene(route) {
    return route.sceneConfig || DEFAULT_TRANSITION
  }

  renderScene(route, navigator) {
    const {
      component: SceneComponent,
      props: routeProps
    } = route

    const { store } = this.props

    return (
      <View style={[{ flex: 1 }, { backgroundColor: 'purple' }]}>
        <Provider store={store}>
          <SceneComponent
            navigator={navigator}
            route={route}
            {...routeProps}
          />
        </Provider>
      </View>
    )
  }

  render() {
    const { props } = this

    return (
      <Navigator
        style={{ flex: 1 }}
        initialRoute={props.initialRoute}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
      />

    )
  }
//navigationBar={
  //<Navigator.NavigationBar
    //style={{
      //backgroundColor: 'rgba(238, 238, 238, .6)',
      //borderBottomWidth: 1,
      //borderBottomColor: 'lightgrey'
    //}}
    //routeMapper={new NavigationBarRouteMapper()}
  ///>
//}
}
