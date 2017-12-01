import { connect } from 'react-redux'
import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, Image, 
         Dimensions, ScrollView, Animated, PanResponder } from 'react-native'
import { Button, Icon, Avatar } from 'react-native-elements'
import { PhotographCard } from '../../components'

/** --------------------------------------------------------
 *
 * Pure
 */
// https://stackoverflow.com/questions/35234457/react-native-panresponder-to-get-current-scrollview-position#35257810
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

const SWIPE_THRESHOLD = 0.4 * SCREEN_WIDTH
const PIC_MIN_HEIGHT = 40
const PIC_MAX_HEIGHT = SCREEN_HEIGHT / 2.3

class Pure extends Component {
  static navigationOptions = {
    title: 'Photograph',
    /*
    headerTitle:
        <Image
          style={{ height: 300, width: SCREEN_WIDTH }} 
          source={{uri: 'https://www.stockvault.net/blog/wp-content/uploads/2013/11/Portrait-8.jpg'}}/>,
    */
    // headerLeft: <Text> HeaderLeft </Text>,
    headerTintColor: 'green',
    headerRight:
        <View>
        <Image
          style={{ height: 300, width: 10, alignSelf: 'stretch' }} 
          source={{uri: 'https://www.stockvault.net/blog/wp-content/uploads/2013/11/Portrait-8.jpg'}} />
        </View>,
    headerTitleStyle: {
        color: 'red',
        zIndex: 30
    },
    headerStyle: {
        justifyContent: 'flex-start',
        borderColor: 'blue',
        borderWidth: 4,
        marginLeft: 20,
        height: 300,
        marginTop: Platform.OS === 'android' ? 24 : 0,
        display: 'none'
    }
  }

  constructor (props) {
    super(props)
    const position = new Animated.ValueXY()

    const panResponder = PanResponder.create({
      // ignore touch and handle only move-gestures
      onMoveShouldSetPanResponderCapture: (e, gesture) => {
        // console.log('onMoveShouldSetPanResponderCapture')
        // return Math.abs(gesture.dx) > MOVE_THRESHOLD;
      },
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        const d = gesture.y0 + gesture.dy
        if (d >= PIC_MIN_HEIGHT && d < PIC_MAX_HEIGHT) {
          this.setState({ imageHeight: d })
        }
      },
      onPanResponderRelease: (event, gesture) => {
        console.log('onPanResponderRelease')
      }
    })

    this.state = { panResponder, position, imageHeight: PIC_MAX_HEIGHT, scrollEnabled: false, contentOffsetY: 0 };
  }

  onTouchMoveScrollView (event) {
    // console.log(event.nativeEvent)
    const { pageY, locationY } = event.nativeEvent
    const { beginContentScroll, imageHeight, previousPageY, contentHeight, contentOffsetY, scrollEnabled } = this.state
    const dy = previousPageY ? pageY - previousPageY : 0
    
   // console.log(event.nativeEvent.changedTouches[0].pageY)

    // Dynamically modify the size of the picture according to hand gestures on content.
    if (previousPageY) {
      if(imageHeight >= PIC_MIN_HEIGHT && imageHeight <= PIC_MAX_HEIGHT) {
        if (imageHeight + dy < PIC_MIN_HEIGHT) {
          this.setState({ imageHeight: PIC_MIN_HEIGHT })
        } else if (imageHeight + dy > PIC_MAX_HEIGHT) {
          this.setState({ imageHeight: PIC_MAX_HEIGHT })
        } else if (!scrollEnabled) {        
          this.setState({ imageHeight: imageHeight + dy })
        }     
      }
    }

    // Scroll down the text content.
    if (imageHeight === PIC_MIN_HEIGHT) {
      console.log('DO SOMETHING!!!')

      // if (contentOffsetY < 5) {
      //   if (dy > 0) {
      //     console.log('BRING PICTURE DOWN')
      //     this.setState({ scrollEnabled: false })
      //   } else {
      //     this.setState({ scrollEnabled: true })
      //   }      
      // } 

    }



    this.setState({ previousPageY: pageY })
  }

  onTouchEndScrollView (event) {
    this.setState({ previousPageY: undefined })
  }

  render() {
    const { navigate, goBack } = this.props.navigation
    
    return (
      <View 
        style={styles.container} >
        <Animated.View
          style={[this.state.position.getLayout(), { width: '100%'} ]}
          {...this.state.panResponder.panHandlers}>
          <Image
            style={{ height: this.state.imageHeight, alignSelf: 'stretch', width: null }} 
            source={{uri: 'https://www.stockvault.net/blog/wp-content/uploads/2013/11/Portrait-8.jpg'}} >
            <Icon
              onPress={() => goBack()}
              size={25}
              name='arrow-left'
              type='material-community'
              containerStyle={{
                  paddingLeft: 10,
                  paddingTop: 10,
                  alignItems: 'flex-start'
              }}
              underlayColor={'transparent'}
              color='white' />
          </Image>
        </Animated.View>
        {/* <Animated.View
          style={this.state.position.getLayout()}
          {...this.state.panResponder.panHandlersInfo}
        > */}
        <ScrollView
            ref='ScrollView'
            scrollEnabled={false}
            onScroll={(event) => {
              // console.log(event.nativeEvent)
              console.log('HELLO!!!')
              const contentOffsetY = event.nativeEvent.contentOffset.y
              this.setState({ contentOffsetY })
              // this.contentPushPullPicResize(contentOffsetY)
            }}
            scrollTo={{x: 0, y: 0, animated: true}}
            onTouchStart={(event) => {
              // console.log('START!!!')
              // console.log(event.nativeEvent)
            }}
            onTouchMove={(event) => {
              this.onTouchMoveScrollView(event)
            }}
            onTouchEnd={(event) => {
              this.onTouchEndScrollView(event)
            }}
            onTouchEndCapture={(event) => {
              // console.log('END CAPTURE!')
            }}
            onMomentumScrollBegin={
              (event) => {
                // console.log('onMomentumScrollBegin')
                // console.log(event.nativeEvent)
              }
            }
            onMomentumScrollEnd={
              (event) => { 
                // console.log('onMomentumScrollEnd')
                // console.log(event.nativeEvent)
            }}
            onContentSizeChange={(contentWidth, contentHeight) => {
              // console.log('onContentSizeChange', contentHeight)
              this.setState({ contentHeight })
            }}
            showsVerticalScrollIndicator={true}
            style={{
                width: '100%',
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 12
            }} >
          <View style={{marginBottom: 30}}>
            <Text style={{fontSize: 30}}>Keith Lagrange, </Text>
            <Text style={{fontSize: 15}}>12 years in Photography </Text>
          </View>
          
          <View style={{marginBottom: 30}}>
            <Text style={{fontSize: 25}}>Profile </Text>
            <Text>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</Text>
          </View>

          <View style={{marginBottom: 30}}>
            <Text style={{fontSize: 25}}>Equipment used </Text>
            <Text> Hey ! </Text>
            <Text> Hey ! </Text>
            <Text> Hey ! </Text>
            <Text> Hey ! </Text>
            <Text> Hey ! </Text>
            <Text> Hey ! </Text>
            <Text> Hey ! </Text>
          </View>

          <View style={{marginBottom: 30}}>
            <Text style={{fontSize: 25}}>Some Stats </Text>
            <Text> Hey ! </Text>
            <Text> Hey ! </Text>
            <Text> Hey ! </Text>
            <Text> Hey ! </Text>
            <Text> Hey ! </Text>
            <Text> Hey ! </Text>
            <Text> Hey ! </Text>
          </View>

          <View style={{marginBottom: 30}}>
            <Text style={{fontSize: 25}}>What people are saying </Text>
            <Text> Hey ! </Text>
            <Text> Hey ! </Text>
            <Text> Hey ! </Text>
            <Text> Hey ! </Text>
            <Text> Hey ! </Text>
            <Text> Hey ! </Text>
            <Text> Hey ! </Text>
          </View>

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: Platform.OS === 'android' ? 24 : 0
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