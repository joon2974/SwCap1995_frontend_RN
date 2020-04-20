import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import firebase from 'firebase';

import HomeTab from './AppTabNavigator/HomeTab';
import FriendTab from './AppTabNavigator/FriendTab';
import MyTab from './AppTabNavigator/MyTab';
import PlanTab from './AppTabNavigator/PlanTab';
import SearchTab from './AppTabNavigator/SearchTab';

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

const AppTabContainer = createAppContainer(AppTabNavigator);


export default class MainScreen extends Component{

    static navigationOptions = {
        title: 'Plan A',
        headerRight: () => <Ionicons
            name='ios-log-out'
            size= {30}
            style={{marginRight: 10}}
            onPress={() => firebase.auth().signOut()}/>,
    };
    
    render(){
        return <AppTabContainer/>;
    }
}
