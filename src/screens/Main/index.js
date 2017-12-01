import { connect } from 'react-redux'
import {
  someAction,
  anotherAction,
} from '../../models/example'
import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { Button } from 'react-native-elements'
import { TabNavigator, StackNavigator } from 'react-navigation'
import FindScreen from '../Find'
import ActivityScreen from '../Activity'
import Settings from '../Settings'
import FindFilter from '../FindFilter'
import Find from '../Find'
import Photograph from '../Photograph'

/** --------------------------------------------------------
 *
 * Pure
 */
const MainScreenNavigator = TabNavigator(
  {
    settings: { screen: Settings },
    find: { screen: Find },
    activity: { screen: ActivityScreen }
  }, 
  {
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: 'white',
      style: {
        backgroundColor: '#517fa4',
        marginTop: Platform.OS === 'android' ? 24 : 0
      },
      labelStyle: {
        fontSize: 12
      }
    }      
  }
)

MainScreenNavigator.navigationOptions = {
  headerStyle: {
      display: 'none'
  }
}

const SimpleApp = StackNavigator({
  home: { screen: MainScreenNavigator },
  findFilter: { screen: FindFilter },
  photograph: { screen: Photograph }
})


class Pure extends Component {
  render() {
    const {
      // from s
      hey,

      // from d
      anotherAction
    } = this.props

    return (
      <SimpleApp />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})




/** --------------------------------------------------------
 *
 * Data Injection
 */
const s = state => {
  // const allAccountDetls = state.dashboard.allAccountDetls || []
  return {
    hey: 'HELLO'
  }
}

const d = dispatch => ({
  anotherAction: () => dispatch(anotherAction())
})

export default connect(s, d)(Pure)
