import { connect } from 'react-redux'
import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, ListView } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Button, Icon, Card, Rating } from 'react-native-elements'
import { MainNavigator } from '../Main'
import FindFilter from '../FindFilter'
import { PhotographCard } from '../../components' 

/** --------------------------------------------------------
 *
 * Pure
 */

class Pure extends Component {
  static navigationOptions = {
    title: 'BROWSE'
  }

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']),
    }
  }

  photographCard () {
    return (
      <PhotographCard 
        navigation={this.props.navigation}
      />
    )
  }

  render() {
    const { navigate } = this.props.navigation

    // const SimpleApp = StackNavigator({
    //     Home: { screen: MainNavigator },
    //     findFilter: { screen: FindFilter }
    // })

    return (
      <View style={styles.container}>
        <Button
          medium
          raised
          icon={{name: 'sort', color: '#517fa4'}}
          backgroundColor={'white'}
          color={'#517fa4'}
          containerViewStyle={{
            width: '100%'
          }}
          title='SORT/FILTER'
          onPress={
              () => navigate('findFilter')
          }
        />
        <View style={{ 
            width: '100%',
          }}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this.photographCard()}
          />
        </View>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center'
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
