import React, {Component} from 'react'
import Navigator from './src/components/Navigator'
import {ThemeManager} from './src/components/ThemeManager'
import SplashScreen from 'react-native-splash-screen'
import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage'
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    SplashScreen.hide()
    this.checkPermission()
  }
  async checkPermission () {
    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          // user has permissions
          console.log('permissions accept')
          this.getToken()
        } else {
          // user doesn't have permission
          console.log('permissions reject')
          this.requestPermission()
        }
      })
  }
  async requestPermission () {
    firebase
      .messaging()
      .requestPermission()
      .then(() => {
        // User has authorised
        console.log('permissions accept in requestPermission')
        this.getToken()
      })
      .catch(error => {
        // User has rejected permissions
        console.log('permission rejected')
      })
  }
  async getToken () {
    let fcmToken = await AsyncStorage.getItem('fcmToken')

    console.log('before fcmToken: ', fcmToken)
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken()
      if (fcmToken) {
        try {
          await firebase
            .database()
            .ref('devices_token/')
            .push({fcmToken: fcmToken, platforms: Platform.OS})
            .then(res => res.json())
            .then(res => {
              console.log(res)
            })
            .catch(err => {
              console.log(err)
            })
          await AsyncStorage.setItem('fcmToken')
        } catch (error) {
          // User has rejected permissions
          console.log(error)
        }
        console.log('after fcmToken: ', fcmToken)
        await AsyncStorage.setItem('fcmToken', fcmToken)
      }
    }
  }
  render () {
    return (
      <ThemeManager>
        <Navigator />
      </ThemeManager>
    )
  }
}

export default App
