import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MyMenuScreen from '../MyScreens/MyMenuScreen';
import HomeMain from '../HomeScreens/HomeMain';

const HomeStackNavigator = createStackNavigator({
  Main: {
    screen: HomeMain,
  },
  MyMenuScreen: {
    screen: MyMenuScreen,
  },
}, {
  initialRouteName: 'Main',
});

const HomeAppContainer = createAppContainer(HomeStackNavigator);

export default class HomeTab extends Component {
    static navigationOptions = {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-home" style={{ color: tintColor }} />
      ),
    }

    render() {
      return <HomeAppContainer />;
    }
}
