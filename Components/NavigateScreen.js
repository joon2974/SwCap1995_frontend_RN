import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Platform, 
} from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import firebase from 'firebase';

import LoginScreen from './LogInScreens/LoginScreen';
import SignUpScreen from './LogInScreens/SignUpScreen';
import FindPasswordScreen from './LogInScreens/FindPasswordScreen';

import MyMenuScreen from './MyScreens/MyMenuScreen';
import AddPoint from './MyScreens/AddPointScreen';
import ChangePassword from './MyScreens/ChangePassword';
import AllServiceScreen from './MyScreens/AllServiceScreen';
import ServiceScreen from './MyScreens/ServiceScreen';
import NoticeScreen from './MyScreens/noticeScreen';
import HomeMain from './HomeScreens/HomeMain';
import WatcherPage from './HomeScreens/WatcherPage';
import DailyCertifyCamera from './HomeScreens/DailyCertifyCamera';
import DailyCertifyGalary from './HomeScreens/DailyCertifyGalary';
import NotiTestScreen from './HomeScreens/NotiTestScreen';
import FaceAuthenticationScreen from './HomeScreens/FaceAuthenticationScreen';
import CameraTestScreen from './MyScreens/CameraTestScreen';
import Estimate from './HomeScreens/EstimatePlan';
import AuthenticationPage from './SearchScreens/AuthenticationPage';

import FriendScreen from './FriendScreens/FriendScreen';
import AddFriendScreen from './FriendScreens/AddFriendScreen';

import PlanMain from './PlanScreens/PlanMain';
import MakePlanStep1 from './PlanScreens/MakePlanStep1';
import MakePlanStep2 from './PlanScreens/MakePlanStep2';
import MakePlanStep3 from './PlanScreens/MakePlanStep3';
import CustomMakePlanStep1 from './PlanScreens/CustomMakePlanStep1';
import CameraScreen from './PlanScreens/CameraScreen';
import ImagePickScreen from './PlanScreens/ImagePickScreen';
import CustomCameraScreen from './PlanScreens/CustomCameraScreen';
import CustomImagePickScreen from './PlanScreens/CustomImagePickScreen';

import { firebaseConfig } from '../firebaseConfig';
import SearchScreen from './SearchScreens/SearchScreen';
import Searching from './SearchScreens/Searching';
import CategoryList from './SearchScreens/CategoryList';
import HotPlan from './SearchScreens/HotPlan';
import PlanList from './SearchScreens/PlanList';
import DetailPlan from './SearchScreens/DetailPlan';
import Joom from './SearchScreens/TabList/Joom';
import DaileyAuthentication from './SearchScreens/DaileyAuthentication';

const statusbarHeight = Platform.OS === 'ios' ? Constants.statusBarHeight : 0;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const LoginStack = createStackNavigator();
function LoginStackScreen() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="로그인" component={LoginScreen} />
      <LoginStack.Screen name="회원가입" component={SignUpScreen} />
      <LoginStack.Screen name="비밀번호 찾기" component={FindPasswordScreen} />
    </LoginStack.Navigator>
  );
}

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#FD8A69', 
        height: 60 + statusbarHeight,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center', 
    }}>
      <HomeStack.Screen name="Plan A" component={HomeMain} />
      <HomeStack.Screen name="MyMenuScreen" component={MyMenuScreen} />
      <HomeStack.Screen name="WatcherPage" component={WatcherPage} />
      <HomeStack.Screen name="NotiTestScreen" component={NotiTestScreen} />
      <HomeStack.Screen name="일일인증: 카메라" component={DailyCertifyCamera} />
      <HomeStack.Screen name="일일인증: 갤러리" component={DailyCertifyGalary} />
      <HomeStack.Screen name="일일인증: 본인인증" component={FaceAuthenticationScreen} />
      <HomeStack.Screen name="플랜평가하기" component={Estimate} />
      <HomeStack.Screen name="인증 리스트" component={AuthenticationPage} />
      <HomeStack.Screen name="감시 리스트" component={WatcherPage} />
      <HomeStack.Screen name="플랜 상세 정보" component={DetailPlan} />
      <HomeStack.Screen name="줌" component={Joom} />
      <HomeStack.Screen name="인증" component={AuthenticationPage} />
    </HomeStack.Navigator>
  );
}

const SearchStack = createStackNavigator();
function SearchStackScreen() {
  return (
    <SearchStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#FD8A69', 
        height: 60 + statusbarHeight,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center', 
    }}>
      <SearchStack.Screen name="검색" component={SearchScreen} />
      <SearchStack.Screen name="검색하기" component={Searching} />
      <SearchStack.Screen name="카테고리" component={CategoryList} />
      <SearchStack.Screen name="인기 플랜" component={HotPlan} />
      <SearchStack.Screen name="플랜 목록" component={PlanList} />
      <SearchStack.Screen name="플랜 상세 정보" component={DetailPlan} />
      <SearchStack.Screen name="인증" component={AuthenticationPage} />
      <SearchStack.Screen
        name="일일 인증"
        component={DaileyAuthentication}
      />
    </SearchStack.Navigator>
  );
}
const FriendStack = createStackNavigator();
function FriendStackScreen() {
  return (
    <FriendStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#FD8A69', 
        height: 60 + statusbarHeight,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center', 
    }}>
      <FriendStack.Screen name="친구 목록" component={FriendScreen} />
      <FriendStack.Screen name="친구 추가" component={AddFriendScreen} />
    </FriendStack.Navigator>
  );
}
const PlanStack = createStackNavigator();
function PlanStackScreen() {
  return (
    <PlanStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#FD8A69', 
        height: 60 + statusbarHeight,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center', 
    }}>
      <PlanStack.Screen name="플랜" component={PlanMain} />
      <PlanStack.Screen name="플랜 만들기: 1단계" component={MakePlanStep1} />
      <PlanStack.Screen name="플랜 만들기: 2단계" component={MakePlanStep2} />
      <PlanStack.Screen name="플랜 만들기: 3단계" component={MakePlanStep3} />
      <PlanStack.Screen name="플랜 만들기: 1단계(커스텀)" component={CustomMakePlanStep1} />
      <PlanStack.Screen name="카메라" component={CameraScreen} />
      <PlanStack.Screen name="갤러리 선택" component={ImagePickScreen} />
      <PlanStack.Screen name="카메라(인증사진 등록)" component={CustomCameraScreen} />
      <PlanStack.Screen name="갤러리 선택(인증사진 등록)" component={CustomImagePickScreen} />
    </PlanStack.Navigator>
  );
}

const MyMenuStack = createStackNavigator();
function MyMenuStackScreen() {
  return (
    <MyMenuStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#FD8A69', 
        height: 60 + statusbarHeight,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center', 
    }}>
      <MyMenuStack.Screen name="마이 메뉴" component={MyMenuScreen} />
      <MyMenuStack.Screen name="포인트 충전" component={AddPoint} />
      <MyMenuStack.Screen name="비밀번호 변경" component={ChangePassword} />
      <MyMenuStack.Screen name="카메라 테스트" component={CameraTestScreen} />
      <MyMenuStack.Screen name="고객센터" component={AllServiceScreen} />
      <MyMenuStack.Screen name="공지사항" component={NoticeScreen} />
      <MyMenuStack.Screen name="문의하기" component={ServiceScreen} />
    </MyMenuStack.Navigator>
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
          <Tab.Screen name="My" component={MyMenuStackScreen} />
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
