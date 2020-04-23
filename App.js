import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from './Components/LogInScreens/LoginScreen';
import SignUpScreen from './Components/LogInScreens/SignUpScreen';

import HomeTab from './Components/AppTabNavigator/HomeTab';
import FriendTab from './Components/AppTabNavigator/FriendTab';
import MyTab from './Components/AppTabNavigator/MyTab';
import PlanTab from './Components/AppTabNavigator/PlanTab';
import SearchTab from './Components/AppTabNavigator/SearchTab';

import firebase from 'firebase';
import {firebaseConfig} from './firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const LoginStack = createStackNavigator({Login: LoginScreen, SignUp: SignUpScreen});
const AppTabNavigator = createMaterialTopTabNavigator({
  Home: {screen: HomeTab},
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

export default class App extends Component{
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