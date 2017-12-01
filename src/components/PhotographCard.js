import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Card, Icon, Button } from 'react-native-elements'


export class PhotographCard extends Component {

  render () {
    const {
        navigation
    } = this.props

    const { navigate } = navigation

    return (
      <TouchableOpacity 
        onPress={() => {
            console.log('HEY!AKJSDKAJSD')
            navigate('photograph')
        }}
        activeOpacity={1}>
        <Card
          containerStyle={{
            borderWidth: 0,
            borderColor: 'white',
            marginTop: 10,
            marginBottom: 30,
            marginLeft: 10,
            marginRight: 10
          }}
          titleStyle={{
            display: 'none'
          }}
          image={{
            // uri: 'https://udemy-images.udemy.com/course/750x422/394968_538b_7.jpg'
            uri: 'https://www.stockvault.net/blog/wp-content/uploads/2013/11/Portrait-8.jpg'
          }}
          imageStyle={{
            height: 300,
            // width: '100%'
          }}
        >
          <View style={{
              flexDirection: 'row',
            }}>
             <View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                  <Icon
                    name='emoticon'
                    type='material-community'
                    color='#517fa4' />
                  <Text style={{color: '#517fa4'}}> 6 </Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                  <Icon
                    name='emoticon-neutral'
                    type='material-community'
                    color='#517fa4' />
                  <Text style={{color: '#517fa4'}}> 1 </Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                  <Icon
                    name='emoticon-sad'
                    type='material-community'
                    color='#517fa4' />
                  <Text style={{color: '#517fa4'}}> 0 </Text>
                </View>
           </View>  
          </View>
        </Card>
      </TouchableOpacity>
    )
  }
}

