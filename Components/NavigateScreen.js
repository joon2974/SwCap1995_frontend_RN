import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from './LogInScreens/LoginScreen';
import SignUpScreen from './LogInScreens/SignUpScreen';

import HomeTab from './AppTabNavigator/HomeTab';
import FriendTab from './AppTabNavigator/FriendTab';
import MyTab from './AppTabNavigator/MyTab';
import PlanTab from './AppTabNavigator/PlanTab';
import SearchTab from './AppTabNavigator/SearchTab';

import MyMenuScreen from './MyScreens/MyMenuScreen';
import HomeMain from './HomeScreens/HomeMain';

import firebase from 'firebase';
import {firebaseConfig} from '../firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const LoginStack = createStackNavigator({Login: LoginScreen, SignUp: SignUpScreen});
//const HomeStack = createStackNavigator({Main:HomeMain, MyMenuScreen: MyMenuScreen });
const AppTabNavigator = createMaterialTopTabNavigator({
  //Home: HomeStack,
  Home:{screen: HomeTab},
  Search: {screen: SearchTab},
  Plan: {screen: PlanTab},
  Friend: {screen: FriendTab},
  My: {screen: MyTab},
}, {
  swipeEnabled: true,
  tabBarPosition: 'bottom',
  tabBarOptions: {
      style: {
          ...Platform.select({
              ios: {
                  backgroundColor:'white',
              },
              android: {
                  backgroundColor: 'white'
              }
          })
      },
      iconStyle: {height: 10, alignItems:'center'},
      labelStyle: {height: 20},
      activeTintColor: '#000',
      inactiveTintColor: '#d1cece',
      upperCaseLabel: false,
      showLabel: true,
      showIcon: true,
  },
});

const LoginStackContainer = createAppContainer(LoginStack);
const MainTabContainer = createAppContainer(AppTabNavigator);

export default class NavigationScreen extends Component{
  state={
    isSignedIn: false,
    isFirebaseLoaded: false,
  }

  componentDidMount(){
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(
      function(user){
            console.log('AUTH STATE CHANGED CALLED');
        if(user){
            this.state.isSignedIn = true;
        }else{
            this.state.isSignedIn = false;
        }
        this.state.isFirebaseLoaded = true;
        this.forceUpdate();
      }.bind(this));
  }

  render(){
    const { isSignedIn, isFirebaseLoaded } = this.state;
      if(!isFirebaseLoaded){
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large"/>
          </View>
        );
      }

      if(isFirebaseLoaded && !isSignedIn){
        return (
          <LoginStackContainer />
        );
      }

      return(
        <MainTabContainer />
      )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
})