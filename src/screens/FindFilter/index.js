import { connect } from 'react-redux'
import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { Button, Icon } from 'react-native-elements'

/** --------------------------------------------------------
 *
 * Pure
 */
class Pure extends Component {
  static navigationOptions = {
    title: 'Sort & Filter',
    headerTitleStyle: {
        color: 'red'
    },
    headerStyle: {
        marginTop: Platform.OS === 'android' ? 24 : 0
    }
  }

  render() {
    const { navigate, state } = this.props.navigation

    return (
      <View style={styles.container}>
        <Text> FIND FILTER PAGE </Text>
      </View>
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
  return {
  }
}

const d = dispatch => ({
})

export default connect(s, d)(Pure)
