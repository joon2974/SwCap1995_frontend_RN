import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import NavigationScreen from './Components/NavigateScreen';

export default class App extends Component{
 
  render(){
      return(
        <NavigationScreen />
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