import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoginScreen from './LogInScreens/LoginScreen';
import SignUpScreen from './LogInScreens/SignUpScreen';

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

const LoginStack = createStackNavigator();
function LoginStackScreen(){
    return(
        <LoginStack.Navigator>
            <LoginStack.Screen name='Login' component={LoginScreen} />
            <LoginStack.Screen name='SignUp' component={SignUpScreen} />
        </LoginStack.Navigator>
    )
}

const HomeStack = createStackNavigator();
function HomeStackScreen(){
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen name='Main' component={HomeMain} />
            <HomeStack.Screen name="MyMenuScreen" component={MyMenuScreen} />
        </HomeStack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

export default function NavigateScreen(){
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isFirebaseLoaded, setIsFirebaseLoaded] = useState(false);

    useEffect(() => {
        checkIfLoggedIn();
    }, [isSignedIn, isFirebaseLoaded])

    const checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(
        function(user){
                console.log('AUTH STATE CHANGED CALLED');
            if(user){
                setIsSignedIn(true);
            }else{
                setIsSignedIn(false);
            }
            setIsFirebaseLoaded(true);
        });
    }

    if(!isFirebaseLoaded){
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large"/>
          </View>
        );
    }
    else if(isFirebaseLoaded && !isSignedIn){
        return (
            <NavigationContainer>
                <LoginStackScreen />
            </NavigationContainer>
        )
    }
    else{
        return(
            <NavigationContainer>
                <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;

                        if(route.name === 'Home'){
                            iconName = focused ? 'ios-home' : 'ios-home';
                        }else if(route.name === 'Search'){
                            iconName = focused ? 'ios-search' : 'ios-search';
                        }else if(route.name === 'Plan'){
                            iconName = focused ? 'ios-calendar' : 'ios-calendar';
                        }else if(route.name === 'Friend'){
                            iconName = focused ? 'ios-people' : 'ios-people';
                        }else if(route.name === 'My'){
                            iconName = focused ? 'ios-person' : 'ios-person';
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#000',
                    inactiveTintColor: '#d1cece'
                }}>
                    <Tab.Screen name = "Home" component={HomeStackScreen} />
                    <Tab.Screen name = "Search" component={SearchTab} />
                    <Tab.Screen name = "Plan" component={PlanTab} />
                    <Tab.Screen name = "Friend" component={FriendTab} />
                    <Tab.Screen name = "My" component={MyTab} />
                </Tab.Navigator>
            </NavigationContainer>
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