import { connect } from 'react-redux'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

/** --------------------------------------------------------
 *
 * Pure
 */
class Pure extends Component {
  static navigationOptions = {
    tabBarLabel: 'ACTIVITY',
  }

  render() {
    const { navigate } = this.props.navigation
    
    return (
      <View style={styles.container}>
        <Text> ACTIVITY PAGE </Text>
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