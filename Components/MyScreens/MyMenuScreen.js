import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions, 
  ScrollView,
} from 'react-native';
import firebase from 'firebase';
import MyPageBtn from './MyComponents/MyPageBtn';

const { height, width } = Dimensions.get('window');

export default class MyMenuScreen extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.myInfoContainer}>
            <Text>내 정보</Text>
          </View>

          <View style={styles.calendarContainer}>
            <Text>달력 출력</Text>
          </View>

          <Button title="Log Out" onPress={() => firebase.auth().signOut()} />

          <MyPageBtn 
            btnName="로그 아웃"
            btnFunc={() => alert('로그 아웃')}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: 'white',
  },
  myInfoContainer: {
    width: width,
    height: height / 4,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarContainer: {
    width: width,
    height: height / 3,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
