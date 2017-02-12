import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'


class NavigationBarRouteMapper {
  LeftButton(route, navigator, index, navState) {
    const previousRoute = navState.routeStack[index - 1]

    if (index === 0) {
      return null
    }

    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {previousRoute.title || 'Back'}
        </Text>
      </TouchableOpacity>
    )
  }
  RightButton() {
    return (<View></View>)
  }
  Title(route) {
    return (
      <View>
        {
          (typeof route.title === "string")
            ? (
              <Text style={[styles.navBarText, styles.navBarTitleText]}>
                {route.title || route.component.Title || '(no title)'}
              </Text>
            )
            : route.title
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarButtonText: {
    color: '#5890FF',
  },
  navBarTitleText: {
    color: '#373E4D',
    fontWeight: '500',
    marginVertical: 9,
  },
})

export default NavigationBarRouteMapper
