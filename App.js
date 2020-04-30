import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import NavigationScreen from './Components/NavigateScreen';
import ErrorBoundary from './ErrorBoundary';

export default class App extends Component{
 
  render(){
      return(
        <ErrorBoundary>
          <NavigationScreen />
        </ErrorBoundary>
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