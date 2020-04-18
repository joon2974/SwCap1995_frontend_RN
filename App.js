import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createSwitchNavigator ,createAppContainer} from 'react-navigation';
import MainScreen from './Components/NavigateScreen';
import LoadingScreen from './Components/LogInScreens/LoadingScreen';
import LoginScreen from './Components/LogInScreens/LoginScreen';
import SignUpScreen from './Components/LogInScreens/SignUpScreen';
import firebase from 'firebase';
import {firebaseConfig} from './firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class App extends React.Component{
  render(){
    return <AppNavigator />;
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  MainScreen: MainScreen,
  SignUpScreen: SignUpScreen,
});

const AppNavigator = createAppContainer(AppSwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
})