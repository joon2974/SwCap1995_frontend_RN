import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import firebase from 'firebase';

import LoginScreen from './LogInScreens/LoginScreen';
import SignUpScreen from './LogInScreens/SignUpScreen';
import FindPasswordScreen from './LogInScreens/FindPasswordScreen';

import MyMenuScreen from './MyScreens/MyMenuScreen';
import HomeMain from './HomeScreens/HomeMain';
import FriendScreen from './FriendScreens/FriendScreen';
import AddFriendScreen from './FriendScreens/AddFriendScreen';

import PlanMain from './PlanScreens/PlanMain';
import MakePlanStep1 from './PlanScreens/MakePlanStep1';
import CameraScreen from './PlanScreens/CameraScreen';
import ImagePickScreen from './PlanScreens/ImagePickScreen';

import { firebaseConfig } from '../firebaseConfig';
import SearchScreen from './SearchScreens/SearchScreen';
import PlanSearched from './SearchScreens/PlanSearched';
import HotPlan from './SearchScreens/HotPlan';
import DetailPlan from './SearchScreens/DetailPlan';
import Calendar from './SearchScreens/Calendar';
import DaileyAuthentication from './SearchScreens/DaileyAuthentication';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const LoginStack = createStackNavigator();
function LoginStackScreen() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="Login" component={LoginScreen} />
      <LoginStack.Screen name="SignUp" component={SignUpScreen} />
      <LoginStack.Screen name="FindPassword" component={FindPasswordScreen} />
    </LoginStack.Navigator>
  );
}

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Main" component={HomeMain} />
      <HomeStack.Screen name="MyMenuScreen" component={MyMenuScreen} />
    </HomeStack.Navigator>
  );
}

const FriendStack = createStackNavigator();
function FriendStackScreen() {
  return (
    <FriendStack.Navigator>
      <FriendStack.Screen name="FriendScreen" component={FriendScreen} />
      <FriendStack.Screen name="AddFriend" component={AddFriendScreen} />
    </FriendStack.Navigator>
  );
}
const PlanStack = createStackNavigator();
function PlanStackScreen() {
  return (
    <PlanStack.Navigator>
      <PlanStack.Screen name="PlanMain" component={PlanMain} />
      <PlanStack.Screen name="MakePlanStep1" component={MakePlanStep1} />
      <PlanStack.Screen name="CameraScreen" component={CameraScreen} />
      <PlanStack.Screen name="ImagePickScreen" component={ImagePickScreen} />
    </PlanStack.Navigator>
  );
}

const SearchStack = createStackNavigator();
function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen name="PlanSearched" component={PlanSearched} />
      <SearchStack.Screen name="HotPlan" component={HotPlan} />
      <SearchStack.Screen name="DetailPlan" component={DetailPlan} />
      <SearchStack.Screen name="Calendar" component={Calendar} />
      <SearchStack.Screen
        name="DaileyAuthentication"
        component={DaileyAuthentication}
      />
    </SearchStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function NavigateScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isFirebaseLoaded, setIsFirebaseLoaded] = useState(false);

  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(function signIn(user) {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
      setIsFirebaseLoaded(true);
    });
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, [isSignedIn, isFirebaseLoaded]);

  if (!isFirebaseLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else if (isFirebaseLoaded && !isSignedIn) {
    return (
      <NavigationContainer>
        <LoginStackScreen />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'ios-home' : 'ios-home';
              } else if (route.name === 'Search') {
                iconName = focused ? 'ios-search' : 'ios-search';
              } else if (route.name === 'Plan') {
                iconName = focused ? 'ios-calendar' : 'ios-calendar';
              } else if (route.name === 'Friend') {
                iconName = focused ? 'ios-people' : 'ios-people';
              } else if (route.name === 'My') {
                iconName = focused ? 'ios-person' : 'ios-person';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#000',
            inactiveTintColor: '#d1cece',
          }}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Search" component={SearchStackScreen} />
          <Tab.Screen name="Friend" component={FriendStackScreen} />
          <Tab.Screen name="Plan" component={PlanStackScreen} />
          <Tab.Screen name="My" component={MyMenuScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
